import Cookies from 'cookies';
import Link from 'next/link';
import Head from 'next/head';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { Container, Row, Col, Image, } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import useTranslation from 'next-translate/useTranslation';
import { wrapper } from '../../store';
import withAuth from '../../services/withAuth';
import { getOrders } from '../../store/actions/account';
import AccountNavBar from '../../components/Account/NavBar';
import AppTable from '../../components/Table';
import DefaultLayout from '../../components/Layout/DefaultLayout';

const OrderDataTable = ({ data }) => {
  const { t } = useTranslation();
  const headerColumns = [
    t('common:code'),
    t('common:product'),
    '',
    t('common:status'),
    t('common:created_at'),
    t('common:price'),
    t('common:total'),
    '',
  ];
  return (
    <>
      {data.map((order, orderKey) => (
        <div key={orderKey.toString()} className="mb-7">
          <AppTable headers={headerColumns}>
            {order.ordersDetails.map((item, index) => (
              <tr key={index.toString()}>
                <td>
                  <strong>
                    {item.product.product_code}
                  </strong>
                </td>
                <td>
                  <Link href={`/product/${item.product.slug}`}>
                    <Image
                      className="card-shadow-light"
                      src={item.product.thumbnail}
                    />
                  </Link>
                </td>
                <td>
                  <Link href={`/product/${item.product.slug}`}>
                    <strong>
                      {item.product.name}
                    </strong>
                  </Link>
                </td>
                <td>
                  {t(`common:status-${item.status}`)}
                </td>
                <td>
                  {order.created_at}
                </td>
                <td>
                  {Number(item.unite_price).toFixed(0)}֏
                </td>
                <td>
                  <strong>
                    {Number(item.unite_price * item.quantity).toFixed(0)}
                  </strong>֏
                </td>
                <td>
                  <Link href={`/product/${item.product.slug}`} className="text-primary">
                    {t('common:buy_again')}
                  </Link>
                </td>
              </tr>
            ))}
          </AppTable>
          <div className="text-right mb-5">
            {order.shipping_amount > 0 && <p className="my-3 mr-5 text-gray-dark">
            {t('common:delivery-amount')}
            <span className="ml-4">{Number(order.shipping_amount).toFixed(0)}֏</span>
            </p>}
            <h4 className="text-primary my-4 mr-5 font-weight-bold">
            {t('common:subject-to-payment')} <span className="ml-4">{Number(order.total_amount).toFixed(0)}֏</span>
            </h4>
          </div>
        </div>
      ))}
    </>
  );
};

const OrderHistory = ({ orders }) => {
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
        <title>{t('account:history')} | Postmarket</title>
      </Head>
      <DefaultLayout>
        <div className="site-content mt-7">
          <Container className="container-fluid">
            <AccountNavBar active="history" />
            <Row>
              <Col md={12}>
                {orders?.data?.length ?
                  <>
                    <OrderDataTable data={orders.data}/>
                    {(orders.meta.total > 5) && <ReactPaginate
                      pageCount={orders.meta.last_page}
                      initialPage={orders.meta.current_page - 1}
                      pageRangeDisplayed={4}
                      marginPagesDisplayed={2}
                      previousLabel="&#x276E;"
                      nextLabel="&#x276F;"
                      containerClassName="uk-pagination uk-flex-center"
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
    await store.dispatch(getOrders(accessToken, currentPage, locale));
  }
);

const mapStateToProps = state => ({
  orders: state.account.orderHistory,
});

export default withAuth(connect(mapStateToProps, null)(OrderHistory));