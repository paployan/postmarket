import Cookies from 'cookies';
import Link from 'next/link';
import Head from 'next/head';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';
import useTranslation from 'next-translate/useTranslation';
import { wrapper } from '../../store';
import { getWishlist, removeFromWishlist } from '../../store/actions/account';
import { addToCart } from '../../store/actions/cart';
import withAuth from '../../services/withAuth';
import AppTable from '../../components/Table';
import AccountNavBar from '../../components/Account/NavBar';
import DefaultLayout from '../../components/Layout/DefaultLayout';

const WishlistDataTable = ({ data, onRemove }) => {
  const { t } = useTranslation();
  const headerColumns = [
    t('common:code'),
    t('common:product'),
    '',
    t('common:product-description'),
    t('common:price'),
    '',
  ];
  const handleRemoveItem = (e, slug) => {
    e.preventDefault();
    onRemove(slug);
  };
  return (
    <AppTable headers={headerColumns}>
      {data.map((item, index) => (
        <tr key={index.toString()}>
          <td>
            <strong>
              {item.product_code}
            </strong>
          </td>
          <td>
            <Link href={`/product/${item.slug}`}>
              <Image
                className="card-shadow-light"
                src={item.thumbnail}
              />
            </Link>
          </td>
          <td>
            <Link href={`/product/${item.slug}`}>
              <strong>
                {item.name}
              </strong>
            </Link>
          </td>
          <td>
            {item.meta_description}
          </td>
          <td>
            <strong>
              {item.discount ? Math.round((item.unite_price - (item.unite_price * item.discount / 100))) : item.unite_price}֏
            </strong>
          </td>
          <td>
            <Link href={`/product/${item.slug}`}>
              <a className="mr-4">
                <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.6429 17.1313H7.28571L3.35714 0.822266H1M4.14286 3.92876H23L20.6429 14.0248H6.5L4.14286 3.92876Z" stroke="#0063BD" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19.0714 21.7911C19.9393 21.7911 20.6429 21.0956 20.6429 20.2378C20.6429 19.38 19.9393 18.6846 19.0714 18.6846C18.2036 18.6846 17.5 19.38 17.5 20.2378C17.5 21.0956 18.2036 21.7911 19.0714 21.7911Z" stroke="#0063BD" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.85659 21.7911C9.72446 21.7911 10.428 21.0956 10.428 20.2378C10.428 19.38 9.72446 18.6846 8.85659 18.6846C7.98871 18.6846 7.28516 19.38 7.28516 20.2378C7.28516 21.0956 7.98871 21.7911 8.85659 21.7911Z" stroke="#0063BD" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </Link>
            <a href="#" onClick={(e) => handleRemoveItem(e, item.slug)}>
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.7987 10.5891L20.6134 2.78038C20.8768 2.47301 21.0144 2.07763 20.9988 1.67326C20.9832 1.26888 20.8154 0.88529 20.529 0.59914C20.2427 0.31299 19.8588 0.145356 19.4541 0.129737C19.0494 0.114117 18.6537 0.251663 18.3461 0.514888L10.5314 8.24328L2.66849 0.38635C2.36088 0.123124 1.9652 -0.014421 1.56051 0.00119828C1.15583 0.0168176 0.771943 0.184451 0.485573 0.470601C0.199204 0.756752 0.0314419 1.14034 0.0158107 1.54472C0.000179428 1.9491 0.13783 2.34447 0.401257 2.65184L8.24812 10.5891L0.562054 18.1729C0.393729 18.3169 0.25702 18.4942 0.160505 18.6935C0.0639894 18.8929 0.00975177 19.11 0.00119822 19.3313C-0.00735533 19.5525 0.029959 19.7732 0.110799 19.9794C0.191638 20.1856 0.314259 20.3728 0.470962 20.5294C0.627666 20.686 0.81507 20.8085 1.02141 20.8893C1.22775 20.9701 1.44858 21.0073 1.67003 20.9988C1.89147 20.9903 2.10876 20.9361 2.30825 20.8396C2.50775 20.7432 2.68513 20.6066 2.82928 20.4384L10.4993 12.7743L18.121 20.3902C18.4286 20.6534 18.8243 20.7909 19.229 20.7753C19.6337 20.7597 20.0176 20.5921 20.3039 20.3059C20.5903 20.0198 20.7581 19.6362 20.7737 19.2318C20.7893 18.8274 20.6517 18.4321 20.3882 18.1247L12.7987 10.5891Z" fill="#CF1B1B"/>
              </svg>
            </a>
          </td>
        </tr>
      ))}
    </AppTable>
  );
};

const WishList = ({ wishlist, removeItem }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const handlePageChange = (selectedPage) => {
    const {query, pathname} = router;
    query.page = selectedPage + 1;
    router.push({
      pathname,
      query,
    })
  };

  return (
    <>
      <Head>
        <title>{t('account:wishlist-title')} | Postmarket</title>
      </Head>
      <DefaultLayout>
        <div className="site-content mt-7">
          <Container className="container-fluid">
            <AccountNavBar />
            <Row>
              <Col md={12}>
                {wishlist?.data?.length ?
                  <>
                    <WishlistDataTable data={wishlist.data} onRemove={(slug) => removeItem(slug)} />
                    {(wishlist.meta.total > 5) && <ReactPaginate
                      pageCount={wishlist.meta.last_page}
                      initialPage={wishlist.meta.current_page - 1}
                      pageRangeDisplayed={4}
                      marginPagesDisplayed={2}
                      previousLabel="&#x276E;"
                      nextLabel="&#x276F;"
                      containerClassName="uk-pagination uk-flex-center mt-5"
                      activeClassName="uk-active"
                      disabledClassName="uk-disabled"
                      onPageChange={({ selected }) => handlePageChange(selected)}
                    />}
                  </>
                  : <p>{t('account:no-data')}</p>
                }
              </Col>
            </Row>
          </Container>
        </div>
      </DefaultLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, req, res, query, locale }) => {
    const currentPage = (query.page || 1);
    const cookies = new Cookies(req, res);
    const accessToken = cookies.get('access-token');
    await store.dispatch(getWishlist(locale, accessToken, currentPage));
  }
);

const mapStateToProps = state => ({
  wishlist: state.account.wishlist,
});

const mapDispatchToProps = (dispatch) => ({
  removeItem: bindActionCreators(removeFromWishlist, dispatch),
  addItemToCart: bindActionCreators(addToCart, dispatch)
});

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(WishList));
