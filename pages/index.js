import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Row, Col } from 'react-bootstrap';
import NProgress from 'nprogress';
import ReactPaginate from 'react-paginate';
import useTranslation from 'next-translate/useTranslation';
import { wrapper } from '../store';
import { fetchSliderItems } from '../store/actions/slider';
import { fetchCategoryItems } from '../store/actions/categories';
import {
  fetchFeaturedProducts,
  fetchDiscountedProducts,
  setFilteredData
} from '../store/actions/products';
import AppCarousel from '../components/Layout/AppCarousel';
import AccordionCategories from '../components/AccordionCategories';
import ProductList from '../components/Product/List';
import ProductFiltered from '../components/Product/Filtered';
import SearchInput from '../components/SearchInput';
import DefaultLayout from '../components/Layout/DefaultLayout';

const Home = ({ slider, featureProducts, discountProducts, filteredData, setFilteredData }) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [priceMin, setPriceMin] = useState(null);
  const [priceMax, setPriceMax] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [filters, setFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOptions, setFilterOptions] = useState(null);

  const handleFilters = (value) => {
    if (filters.indexOf(value) > -1) {
      setFilters(filters.filter(i => i !== value));
    } else {
      setFilters([ ...filters, ...value]);
    }
  };

  const handleCategoryProducts = (category, subcategories, title) => {
    setActiveCategory(category);
    setSubcategories(subcategories);
    setTitle(title);
    setFilters([]);
  }

  useEffect(() => {
    if (activeCategory) {
      NProgress.start();
      fetch(`/api/categories/${activeCategory}/filters`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subcategories }),
      }).then(res => res.json())
        .then(({ data }) => setFilterOptions(data));
      fetch(`/api/categories/${activeCategory}/products?page=${currentPage}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subcategories, filters, priceMin, priceMax, sortBy }),
      }).then(res => res.json())
      .then((res) => {
        setFilteredData(res);
        NProgress.done();
      });
    }
  }, [activeCategory, filters, priceMin, priceMax, sortBy, currentPage]);

  const handleSearchQuery = ({ searchTerm }) => {
    NProgress.start();
    fetch(`/api/search`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ searchTerm }),
    }).then(res => res.json())
    .then(res => {
      setFilteredData(res);
      NProgress.done();
    });
  };

  return (
    <>
      <Head>
        <title>{t('home:title')} | Postmarket</title>
        <meta name="description" content={t('home:description')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DefaultLayout>
        <AppCarousel
          items={slider.items}
        />
        <div className="site-content">
          <Container className="container-fluid px-2">
            <Row>
              <Col className="order-md-1 mt-7" md={3}>
                <SearchInput onSubmit={handleSearchQuery} />
                <AccordionCategories
                  onCollapse={handleCategoryProducts}
                />
              </Col>
              <Col className="order-md-2 mt-7" md={9}>
                {filteredData ?
                  <>
                    <ProductFiltered
                      title={title}
                      filters={filterOptions}
                      items={filteredData.data || []}
                      onFiltersChange={handleFilters}
                      setPriceMin={setPriceMin}
                      setPriceMax={setPriceMax}
                      setSortBy={setSortBy}
                    />
                    {(filteredData?.meta?.total > 8) && <Row className="mx-auto my-5">
                      <Col xs={12} className="text-center">
                        <ReactPaginate
                          pageCount={filteredData.meta.last_page}
                          initialPage={currentPage- 1}
                          pageRangeDisplayed={4}
                          marginPagesDisplayed={2}
                          previousLabel="&#x276E;"
                          nextLabel="&#x276F;"
                          containerClassName="uk-pagination uk-flex-center"
                          activeClassName="uk-active"
                          disabledClassName="uk-disabled"
                          onPageChange={({ selected }) => setCurrentPage(selected + 1)}
                        />
                      </Col>
                    </Row>}
                  </>
                : null}
                {!filteredData && featureProducts?.data?.length ? <>
                  <Link href="/offer-of-the-day">
                    <h2 className="px-3 heading">
                      {t('common:offer-of-the-day')}
                    </h2>
                  </Link>
                  <ProductList items={featureProducts.data} />
                </> : null}
                {!filteredData && discountProducts?.data?.length ? <>
                  <Link href="/sale">
                    <h2 className="mt-5 px-3 heading">
                    {t('common:sale')}
                    </h2>
                  </Link>
                  <ProductList items={discountProducts.data} />
                </> : null}
              </Col>
            </Row>
          </Container>
        </div>
      </DefaultLayout>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, locale }) => {
    await store.dispatch(fetchSliderItems(locale));
    await store.dispatch(fetchFeaturedProducts(locale));
    await store.dispatch(fetchDiscountedProducts(locale));
    await store.dispatch(fetchCategoryItems(locale));
  }
);

const mapStateToProps = state => ({
  slider: state.slider,
  featureProducts: state.products.featured,
  discountProducts: state.products.discounted,
  filteredData: state.products.filteredData,
});

const mapDispatchToProps = (dispatch) => ({
  setFilteredData: bindActionCreators(setFilteredData, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
