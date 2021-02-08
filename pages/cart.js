import { useState } from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Alert,
} from 'react-bootstrap';
import useTranslation from 'next-translate/useTranslation';
import CartPage from '../components/Cart/Page';
import { useAuth } from '../services/useAuth';
import DefaultLayout from '../components/Layout/DefaultLayout';

const Cart = ({ cartItems }) => {
  const { t } = useTranslation();
  const [message, setMessage] = useState(null);
  const [order, setOrder] = useState(null);
  const { currentUser } = useAuth();
  
  const  handleOnSuccess = ({ success, order }) => {
    setMessage(success ? t('common:checkout-success') : null);
    setOrder(order);
  }

  return (
    <>
      <Head>
        <title>Shopping Cart | Postmarket</title>
      </Head>
      <DefaultLayout>
        <div className="site-content mt-7">
          <Container className="container-fluid px-2">
            <Row>
              <Col md={12}>
                {message && <Alert variant="success mt-7">{message} {(currentUser && currentUser.isOperator) && <a target="_blank" href={`/api/invoice/${order}`}>
                  <ins>{t('common:print-order')}</ins>
                </a>}</Alert>}
                {!cartItems.length ? <p>{t('common:empty-cart')}</p> :
                <CartPage cartItems={cartItems} onSuccess={handleOnSuccess} />}
              </Col>
            </Row>
          </Container>
        </div>
      </DefaultLayout>
    </>
  );
};

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
});

export default connect(mapStateToProps, null)(Cart);
