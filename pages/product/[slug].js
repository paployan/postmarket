import Cookies from 'cookies';
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  Button,
  Alert,
} from 'react-bootstrap';
import useTranslation from 'next-translate/useTranslation';
import { wrapper } from '../../store';
import {
  fetchProductItem,
  fetchProductSimiliarItems,
} from '../../store/actions/products';
import { addToCart } from '../../store/actions/cart';
import QuantityInput from '../../components/Addon/QuantityInput';
import ProductList from '../../components/Product/List';
import { Cart } from '../../components/SVG/index';
import DefaultLayout from '../../components/Layout/DefaultLayout';

const Product = ({ product, similarItems, addToCart }) => {
  const { t } = useTranslation();
  const [wished, setWished] = useState(product.isWished || false);
  const [errors, setErrors] = useState({});
  const [attributes, setAttributes] = useState({ quantity: 1 });

  useEffect(() => {
    setWished(product.isWished);
  }, [product])

  const onAttributeChange = (attr, value) => {
    setAttributes({
      ...attributes,
      [attr]: value,
    });
  };

  const handlerAddToCart = () => {
    let hasError = false;
    setErrors({});
    if (product.colors && !attributes.color) {
      hasError = true;
      setErrors((prevState) => {
        return {
          ...prevState,
          color: t('product:required', { attribute: t('product:color') }),
        };
      });
    }
    if (product.attributes) {
      product.attributes.map((item, i) => {
        if (!attributes.hasOwnProperty(item.key)) {
          hasError = true;
          setErrors((prevState) => {
            return {
              ...prevState,
              [item.key]: t('product:required', { attribute: item.key }),
            };
          });
        }
      });
    }
    if (hasError) {
      return;
    }
    const {
      slug,
      name,
      product_code,
      unite_price,
      quantity,
      thumbnail,
      discount,
      attributes: productAttributes,
    } = product;
    addToCart({
      slug,
      name,
      product_code,
      unite_price: discount ? Math.round((unite_price - (unite_price * discount / 100))) : unite_price,
      quantity,
      thumbnail,
      productAttributes,
      attributes,
    });
  }

  const handleWishlist = (e) => {
    e.preventDefault();
    fetch(`/api/wishlist/${product.slug}/store`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
      .then((response) => {
        if (!response.message) {
          setWished(response.status);
        } else {
          const errs = {
            ...errors,
            authRequired: true,
          }
          setErrors(errs);
        }
      });
  };

  return (
    <>
      <Head>
        <title>{product.name} | Postmarket</title>
      </Head>
      <DefaultLayout>
        <div className="site-content mt-7">
          <Container className="container-fluid px-2">
            {errors.authRequired && <Row><Col md={10} className="mb-4">
              <Alert variant="warning" onClose={() => setErrors((prevState) => ({...prevState, authRequired: null}))} dismissible>
                <div>Խնդրում ենք <Link href="/auth/login">մուտք գործել</Link>, ապրանքն ավելացնելու ձեր նախընտրած ապրանքների ցանկում</div>
              </Alert>
            </Col></Row>}
            <Row>
              <Col md={5}>
                <Image className="card-shadow-light w-100" src={product.images && product.images[0]} />
              </Col>
              <Col md={5} className="offset-md-1">
                <h1 className="h2 font-weight-normal mb-3">
                  {product.name}
                  <a href="#" onClick={handleWishlist} className="float-right">
                    {wished ? <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.5 12.5L9 15L8.5 15.5L4.36649 12.0816L1.84797 9.46939L0.5 7V4.5L0.944444 2.28571L1.84797 1.71384L3.5 0.5H5L6.2963 0.653061L7.55556 1.30612L8.5 2.61224L9.44444 1.30612L10.3889 0.653061L12 0.5H13L15 1.5L16 2.5L16.5 5.5L16.0556 8.16327L15 9.5L13 11L11.5 12.5Z" fill="#FF4242"/>
                      <path d="M16.9719 4.77104C16.7238 2.00625 14.7905 0.00033097 12.3711 0.00033097C10.7593 0.00033097 9.28349 0.878354 8.45305 2.28557C7.63014 0.860151 6.2148 0 4.62879 0C2.20974 0 0.27619 2.00592 0.0283667 4.77071C0.0087501 4.89283 -0.0716781 5.53555 0.172876 6.58368C0.525321 8.09548 1.33941 9.4706 2.52654 10.5594L8.44913 16L14.4734 10.5598C15.6605 9.4706 16.4746 8.09581 16.8271 6.58368C17.0716 5.53588 16.9912 4.89316 16.9719 4.77104ZM16.1905 6.4321C15.8688 7.81284 15.123 9.0708 14.0359 10.0676L8.45305 15.1097L2.96596 10.069C1.87691 9.07014 1.13148 7.81251 0.809435 6.43177C0.577959 5.4399 0.6731 4.87959 0.673427 4.87595L0.678331 4.84253C0.890844 2.42027 2.55205 0.661909 4.62879 0.661909C6.16118 0.661909 7.51015 1.61506 8.1503 3.14903L8.45142 3.87151L8.75253 3.14903C9.38256 1.63856 10.8028 0.66224 12.3715 0.66224C14.4479 0.66224 16.1094 2.4206 16.3262 4.8743C16.3268 4.87959 16.422 5.44023 16.1905 6.4321Z" fill="#FF4242"/>
                    </svg> : <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.3567 4.77104C17.1085 2.00625 15.1753 0.00033097 12.7559 0.00033097C11.1441 0.00033097 9.66826 0.878354 8.83782 2.28557C8.0149 0.860151 6.59956 0 5.01356 0C2.5945 0 0.660956 2.00592 0.413132 4.77071C0.393516 4.89283 0.313088 5.53555 0.557641 6.58368C0.910087 8.09548 1.72418 9.4706 2.91131 10.5594L8.8339 16L14.8582 10.5598C16.0453 9.4706 16.8594 8.09581 17.2118 6.58368C17.4564 5.53588 17.376 4.89316 17.3567 4.77104ZM16.5753 6.4321C16.2536 7.81284 15.5078 9.0708 14.4207 10.0676L8.83782 15.1097L3.35072 10.069C2.26167 9.07014 1.51624 7.81251 1.1942 6.43177C0.962725 5.4399 1.05787 4.87959 1.05819 4.87595L1.0631 4.84253C1.27561 2.42027 2.93681 0.661909 5.01356 0.661909C6.54594 0.661909 7.89491 1.61506 8.53507 3.14903L8.83619 3.87151L9.1373 3.14903C9.76732 1.63856 11.1876 0.66224 12.7562 0.66224C14.8327 0.66224 16.4942 2.4206 16.711 4.8743C16.7116 4.87959 16.8067 5.44023 16.5753 6.4321Z" fill="#FF4242"/>
                    </svg>}
                  </a>
                </h1>
                <h6 className="mb-5">
                  <div>{t('product:vendor')}` {product.vendor && product.vendor.brand_name}</div>
                  <div>{t('product:product-code')}` {product.product_code}</div>
                </h6>
                {product.colors && <Row>
                  <Form.Label column sm="2">
                    {t('product:color')}
                  </Form.Label>
                  <Col sm="10">
                    <div key="checkbox-option" className="checkbox-option mb-2">
                      {product.colors.map((color, index) => (
                        <div className="form-radio-btn" key={index.toString()}>
                          <input
                            type="radio"
                            id={`radio-color-${index}`}
                            name="color"
                            value={color}
                            onChange={(e) => onAttributeChange('color', e.target.value)}
                          />
                          <label
                            style={{ backgroundColor: color }}
                            htmlFor={`radio-color-${index}`}>
                          </label>
                        </div>
                      ))}
                      {errors.color && <span className="float-right text-primary">{errors.color}</span>}
                    </div>
                  </Col>
                </Row>}

                {product.attributes && product.attributes.map((attr, index) => (
                  <Row key={index.toString()}>
                    <Form.Label column sm="2">
                      {attr.key}
                    </Form.Label>
                    <Col sm="10">
                      <div key={`custom-inline-radio-${index}`} className="checkbox-option mb-2">
                        {attr.value && attr.value.split(',').map((val, key) => (
                          <div className="form-radio-btn" key={key.toString()}>
                            <input
                              type="radio"
                              id={`radio-${attr.key}-${key}`}
                              name={`attribute[${attr.key}]`}
                              value={val}
                              onChange={(e) => onAttributeChange(attr.key, e.target.value)}
                            />
                            <label
                              className="label-attribute"
                              htmlFor={`radio-${attr.key}-${key}`}>
                              {val}
                            </label>
                          </div>
                        ))}
                        {errors[attr.key] && <span className="float-right text-primary">{errors[attr.key]}</span>}
                      </div>
                    </Col>
                  </Row>))}

                <div className="mt-4">
                  <QuantityInput
                    onQuantityChange={(i) => onAttributeChange('quantity', i)}
                  />
                </div>

                <div className="my-4 clearfix">
                  <span className="h2">{product.discount ? Math.round((product.unite_price - (product.unite_price * product.discount / 100))) : product.unite_price}֏</span>
                  {product.discount && <span className="ml-4 h3 product-price-strikethrough">
                  {product.unite_price}֏</span>}
                </div>
                <Button
                  variant="secondary"
                  type="button"
                  className="text-white"
                  size="sm"
                  onClick={handlerAddToCart}
                  disabled={!product.quantity}>
                  <span className="mr-2"><Cart /></span>
                  {t('product:cart')}
                </Button>
              </Col>
            </Row>
            {product.description && <Row className="justify-content-left mt-5">
              <Col className="my-auto" md={10}>
                <div
                  dangerouslySetInnerHTML={{__html: product.description}}
                />
              </Col>
            </Row>}

            {similarItems.length ? <Row className="mt-5">
              <Col className="my-auto" md={12}>
                <h2 className="text-left">{t('product:similar-products')}</h2>
                <ProductList items={similarItems} col={3} />
              </Col>
            </Row> : null}
          </Container>
        </div>
      </DefaultLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, query, req, res, locale }) => {
    const cookies = new Cookies(req, res);
    const accessToken = cookies.get('access-token');
    await store.dispatch(fetchProductItem(locale, accessToken, query.slug));
    await store.dispatch(fetchProductSimiliarItems(locale, accessToken, query.slug));
  }
);

const mapStateToProps = state => ({
  product: state.products.item,
  similarItems: state.products.similarItems,
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: bindActionCreators(addToCart, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
