/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Nav,
  Button,
  Form
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { bindActionCreators } from 'redux';
import { FaWallet } from 'react-icons/fa';
import { BsHouseDoor, BsBuilding } from 'react-icons/bs';
import useTranslation from 'next-translate/useTranslation';
import { clearCart } from '../../store/actions/cart';
import { useAuth } from '../../services/useAuth';
import ProductsTable from './ProductsTable';
import CheckoutService from '../../services/checkout.service';

const CartPage = ({ cartItems, clearCart, onSuccess }) => {
  const { t } = useTranslation();
  const [deliveryType, setDeliveryType] = useState('address');
  const { currentUser } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    errors,
    setValue,
  } = useForm({
    mode: 'onChange',
  });

  const states = [
    t('auth:yerevan'),
    t('auth:aragatsotn'),
    t('auth:ararat'),
    t('auth:armavir'),
    t('auth:gegharkunik'),
    t('auth:lori'),
    t('auth:kotayk'),
    t('auth:shirak'),
    t('auth:syunik'),
    t('auth:vayots-dzor'),
    t('auth:tavush'),
  ];

  const handleCheckout = async (formData) => {
    await CheckoutService.request({ ...formData, cart: cartItems, shipping_method: deliveryType })
      .then(res => {
        clearCart();
        onSuccess(res);
      }).catch(err => {
        err.text().then(errorMessage => {
          const { errors } = JSON.parse(errorMessage);
          for (const [key, value] of Object.entries(errors)) {
            setError(key, {
              type: 'manual',
              message: value[0],
            });
          }
        })
      });
  };

  const setActiveTab = (e, type) => {
    e.preventDefault();
    setDeliveryType(type);
  }

  const handleFillForm = (e) => {
    e.preventDefault();
    const { first_name, last_name, email, phone_number, address, state, city, post_index } = currentUser;
    setValue('first_name', first_name, {
      shouldValidate: true,
      shouldDirty: true
    });
    setValue('last_name', last_name, {
      shouldValidate: true,
      shouldDirty: true
    });
    setValue('email', email, {
      shouldValidate: true,
      shouldDirty: true
    });
    setValue('phone_number', phone_number, {
      shouldValidate: true,
      shouldDirty: true
    });
    setValue('address', address, {
      shouldValidate: true,
      shouldDirty: true
    });
    setValue('state', state, {
      shouldValidate: true,
      shouldDirty: true
    });
    setValue('city', city, {
      shouldValidate: true,
      shouldDirty: true
    });
    setValue('post_index', post_index, {
      shouldValidate: true,
      shouldDirty: true
    });
  };

  return (
    <>
      <ProductsTable items={cartItems} />
      <div className="clearfix" />
      <Container>
        <Row className="justify-content-center mt-5">
          <form className="d-contents" onSubmit={handleSubmit(handleCheckout)}>
            <Col className="my-auto" lg={9}>
              <h2 className="text-primary">
                1. {t('common:type-of-delivery')}
              </h2>
              <Row className="cart-devlivery-options pills-navbar text-center mb-4">
                <Col xs={12} md={5} className="offset-md-1">
                  <Nav.Link
                    eventKey={1}
                    className={`card-shadow h3 d-block ${(deliveryType === 'address') ? 'active' : ''}`}
                    onClick={(e) => setActiveTab(e, 'address')}>
                    <BsHouseDoor
                      className="display-2 mb-5 mx-auto d-block"
                    />
                    {t('common:addressed-delivery')}
                  </Nav.Link>
                </Col>
                <Col xs={12} md={5}>
                  <Nav.Link
                    eventKey={2}
                    className={`card-shadow h3 d-block ${(deliveryType === 'post-office') ? 'active' : ''}`}
                    onClick={(e) => setActiveTab(e, 'post-office')}>
                    <BsBuilding
                      className="display-2 mb-5 mx-auto d-block"
                    />
                    {t('common:post-delivery')}
                  </Nav.Link>
                </Col>
              </Row>
              <Row className="mb-5">
                <Col xs={12} md={12} className="card-shadow card-shipping-info">
                  <Row>
                    {currentUser?.email && <Col md={12}>
                      <a href="#" onClick={handleFillForm}>
                        <ins>{t('common:use-my-info')}</ins>
                      </a>
                    </Col>}
                    <Col md={6}>                      
                      <div className={`form-group mb-0 ${errors.first_name ? 'has-error' : ''}`}>
                        <input
                          id="inputFirstName"
                          type="text"
                          name="first_name"
                          ref={register({
                            required: t('auth:required', { attribute: t('auth:name').toLowerCase() }),
                            pattern: {
                              value: /^[a-zA-Z]+$/,
                              message: t('auth:pattern', { attribute: t('auth:name').toLowerCase() })
                            },
                            minLength: {
                              value: 2,
                              message: t('auth:required', { attribute: t('auth:name').toLowerCase(), min:2 })
                            }
                          })}
                        />
                        <label
                          htmlFor="inputFirstName"
                          className="control-label">
                          {t('auth:name')}
                        </label>
                        <i className="bar" />
                        {errors.first_name && <p className="text-danger mt-2">{errors.first_name.message}</p>}
                      </div>
                      <div className={`form-group mb-0 ${errors.last_name ? 'has-error' : ''}`}>
                        <input
                          id="inputLastName"
                          type="text"
                          name="last_name"
                          ref={register({
                            required: t('auth:required', { attribute: t('auth:surname').toLowerCase() }),
                            pattern: {
                              value: /^[a-zA-Z]+$/,
                              message: t('auth:numeric', { attribute: t('auth:surname').toLowerCase() })
                            },
                            minLength: {
                              value: 2,
                              message: t('auth:min', { attribute: t('auth:surname').toLowerCase(), min: 2 })
                            }
                          })}
                        />
                        <label
                          htmlFor="inputLastName"
                          className="control-label">
                          {t('auth:surname')}
                        </label>
                        <i className="bar" />
                        {errors.last_name && <p className="text-danger mt-2">{errors.last_name.message}</p>}
                      </div>
                      <div className={`form-group mb-0 ${errors.email ? 'has-error' : ''}`}>
                        <input
                          id="inputEmailAddress"
                          type="email"
                          name="email"
                          ref={register({
                            required: t('auth:required', { attribute: t('auth:email').toLowerCase() }),
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: t('auth:pattern', { attribute: t('auth:email').toLowerCase() }),
                            },
                            maxLength: {
                              value: 100,
                              message: t('auth:max', { attribute: t('auth:email').toLowerCase(), max: 100 })
                            }
                          })}
                        />
                        <label
                          htmlFor="inputEmailAddress"
                          className="control-label">
                          {t('auth:email')}
                        </label>
                        <i className="bar" />
                        {errors.email && <p className="text-danger mt-2">{errors.email.message}</p>}
                      </div>
                      <div className={`form-group mb-0 ${errors.phone_number ? 'has-error' : ''}`}>
                        <input
                          id="inputPhoneNumber"
                          type="number"
                          name="phone_number"
                          ref={register({
                            required: t('auth:required', { attribute: t('auth:phone_number').toLowerCase() }),
                            minLength: {
                              value: 9,
                              message: t('auth:min', { attribute: t('auth:phone_number').toLowerCase(), min: 9 }),
                            },
                            maxLength: {
                              value: 9,
                              message: t('auth:max', { attribute: t('auth:phone_number').toLowerCase(), max: 9 }),
                            },
                          })}
                        />
                        <label
                          htmlFor="inputPhoneNumber"
                          className="control-label">
                          {t('auth:phone_number')}
                        </label>
                        <i className="bar" />
                        {errors.phone_number && <p className="text-danger mt-2">{errors.phone_number.message}</p>}
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className={`form-group mb-0 ${errors.state ? 'has-error' : ''}`}>
                        <Form.Control
                          as="select"
                          id="inputState"
                          name="state"
                          ref={register({
                            required: t('auth:required', { attribute: t('auth:region').toLowerCase() })
                          })}>
                          {states.map((state, index) => (
                            <option key={index.toString()} value={state}>
                              {state}
                            </option>
                          ))}
                        </Form.Control>
                        <label
                          htmlFor="inputState"
                          className="control-label">
                          {t('auth:region')}
                        </label>
                        <i className="bar" />
                        {errors.state && <p className="text-danger mt-2">{errors.state.message}</p>}
                      </div>
                      <div className={`form-group ${errors.city ? 'has-error' : ''}`}>
                        <input
                          id="inputCity"
                          type="text"
                          name="city"
                          ref={register({
                            required: t('auth:required', { attribute: t('auth:city-village').toLowerCase() })
                          })}
                        />
                        <label
                          htmlFor="inputCity"
                          className="control-label">
                          {t('auth:city-village')}
                        </label>
                        <i className="bar" />
                        {errors.city && <p className="text-danger mt-2">{errors.city.message}</p>}
                      </div>
                      {(deliveryType === 'post-office') ? <div className={`form-group ${errors.post_index ? 'has-error' : ''}`}>
                        <input
                          id="inputPostalCode"
                          type="number"
                          name="post_index"
                          ref={register({
                            required: t('auth:required', { attribute: t('auth:postal-index').toLowerCase() }),
                            minLength: {
                              value: 4,
                              message: t('auth:min', { attribute: t('auth:postal-index').toLowerCase(), min: 4 }),
                            },
                            maxLength: {
                              value: 4,
                              message: t('auth:max', { attribute: t('auth:postal-index').toLowerCase(), max: 4 }),
                            },
                          })}
                        />
                        <label
                          htmlFor="inputPostalCode"
                          className="control-label">
                          {t('auth:postal-index')}
                        </label>
                        <i className="bar" />
                        {errors.post_index && <p className="text-danger mt-2">{errors.post_index.message}</p>}
                      </div> : <div className={`form-group ${errors.address ? 'has-error' : ''}`}>
                        <input
                          id="inputAddress"
                          type="text"
                          name="address"
                          ref={register({
                            required: t('auth:required', { attribute: t('auth:delivery-address').toLowerCase() }),
                          })}
                        />
                        <label
                          htmlFor="inputAddress"
                          className="control-label">
                          {t('auth:delivery-address')}
                        </label>
                        <i className="bar" />
                        {errors.address && <p className="text-danger mt-2">{errors.address.message}</p>}
                      </div>}
                    </Col>
                    <Col>
                      <div className={`checkbox mt-4 ${errors.agree?.type ? 'has-error' : ''}`}>
                        <label>
                          <input
                            type="checkbox"
                            name="agree"
                            ref={register({
                              required: t('auth:agree-required'),
                            })}
                          />
                          <i className="helper" />
                          {t('auth:agree')}
                        </label>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <h2 className="text-primary">
                2. {t('common:payment-option')}
              </h2>
              <Row className="cart-devlivery-options pills-navbar text-center mb-4">
                <Col xs={12} md={5}>
                  <Nav.Link eventKey={1} className="card-shadow h3 d-block active">
                    <FaWallet
                      className="display-2 mb-5 mx-auto d-block"
                    />
                    {t('common:payment-cash')}
                  </Nav.Link>
                </Col>
                <Col xs={12} md={12} className="mt-4">
                  <Button
                    variant="secondary"
                    type="submit"
                    className="float-right text-white">
                    {t('common:continue')}
                  </Button>
                </Col>
              </Row>
            </Col>
          </form>
        </Row>
      </Container>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearCart: bindActionCreators(clearCart, dispatch)
});

export default connect(null, mapDispatchToProps)(CartPage);
