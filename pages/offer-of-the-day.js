import Head from 'next/head';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';
import useTranslation from 'next-translate/useTranslation';
import { wrapper } from '../store';
import { fetchFeaturedProducts } from '../store/actions/products';
import ProductList from '../components/Product/List';
import DefaultLayout from '../components/Layout/DefaultLayout';

const OfferOfTheDay = ({ products }) => {
    const router = useRouter();
    const { t } = useTranslation();

    const handlePageChange = (selectedPage) => {
        const { query, pathname } = router;
        query.page = selectedPage + 1;
        router.push({
            pathname,
            query,
        })
    };
    
    return (
        <>
            <Head>
                <title>{t('common:offer-of-the-day')} | Postmarket</title>
            </Head>
            <DefaultLayout>
                <div className="site-content">
                    <Container className="container-fluid px-2 mt-7">
                        <Row>
                            <Col md={12}>
                                <h1>{t('common:offer-of-the-day')}</h1>
                            </Col>
                        </Row>
                        <ProductList
                            items={products.data}
                            col={3}
                        />
                        {(products.meta.total > 12) && <ReactPaginate
                        pageCount={products.meta.last_page}
                        initialPage={products.meta.current_page - 1}
                        pageRangeDisplayed={4}
                        marginPagesDisplayed={2}
                        previousLabel="&#x276E;"
                        nextLabel="&#x276F;"
                        containerClassName="uk-pagination uk-flex-center"
                        activeClassName="uk-active"
                        disabledClassName="uk-disabled"
                        onPageChange={({ selected }) => handlePageChange(selected)}
                    />}
                    </Container>
                </div>
            </DefaultLayout>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    async ({ store, query, locale }) => {
        await store.dispatch(fetchFeaturedProducts(locale, 12, (query.page || 1)));
    }
);

const mapStateToProps = state => ({
  products: state.products.featured,
});

export default connect(mapStateToProps, null)(OfferOfTheDay);
