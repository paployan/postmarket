/* eslint-disable jsx-a11y/label-has-associated-control */
import Head from 'next/head';
import { useState, createRef } from 'react';
import { Container, Row, Col, Button, Figure, Spinner, Modal, Alert, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';
import { useAuth } from '../../services/useAuth';
import withAuth from '../../services/withAuth';
import AccountNavBar from '../../components/Account/NavBar';
import DefaultLayout from '../../components/Layout/DefaultLayout';

const Account = () => {
  const { t } = useTranslation();
  const fileInput = createRef();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState({});
  const [errorText, setErrorText] = useState('');
  const { currentUser, setCurrentUser } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    errors,
    watch
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

  const handleClose = (e) => {
    if (e) {
      e.preventDefault();
    }
    setShow(false);
  };
  const handleShow = (e) => {
    e.preventDefault();
    setShow(true);
  };

  const onSubmit = (formData) => {
    setLoading(true);
    fetch('/api/account/update', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then(response => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    }).then(({ data }) => {
        setCurrentUser(data);
        setLoading(false);
      })
      .catch(err => {
        err.text().then(errorMessage => {
          const { errors } = JSON.parse(errorMessage);
          for (const [key, value] of Object.entries(errors)) {
            setError(key, {
              type: 'manual',
              message: value[0],
            });
          }
          setLoading(false);
        })
      });
  };

  // eslint-disable-next-line camelcase
  const onPasswordChange = ({ current_password, password, password_confirmation }, e) => {
    fetch('/api/account/change-password', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ current_password, password, password_confirmation }),
    }).then(response => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    }).then((res) => {
        if (res.success) {
          e.target.reset();
        }

        setPasswordChanged(res);
        setLoading(false);
      })
      .catch(err => {
        err.text().then(errorMessage => {
          const { errors } = JSON.parse(errorMessage);
          Object.entries(errors).map((row) => {
            setError(row[0], {
              type: 'manual',
              message: row[1][0],
            });
          });
          setLoading(false);
        })
      });
  };

  const handleAvatarUpload = () => {
    setErrorText('');
    const maxSize = 2048;
    const { files } = fileInput.current;
    if (files.length > 0) {
      const size = files[0].size / maxSize / maxSize;
      if (!files[0].type.match('image.*')) {
        setErrorText(t('account:image'));
      } else if (size > 1) {
        setErrorText(t('account:image-size'));
      } else {
        const formData = new FormData();
        // const imageURL = URL.createObjectURL(files[0])
        formData.append('avatar', files[0]);
        fetch('/api/account/avatar-upload', {
          method: 'POST',
          body: formData,
        }).then(response => {
          if (!response.ok) {
            throw response;
          }
          return response.json();
        }).then(({ data }) => {
            setCurrentUser(data);
          })
      }
    }
  };

  return (
    <>
      <Head>
        <title>{t('account:personal-data')} | Postmarket</title>
      </Head>
      <DefaultLayout>
        <div className="site-content mt-7">
          <Container className="container-fluid">
            <AccountNavBar active="personal-information" />
            <Row className="justify-content-center mb-5">
              <Col className="my-auto card-shadow p-5" md="10" lg="8">
                <div className="img-container" onClick={() => fileInput.current.click()}>
                  <input type="file" name="avatar" ref={fileInput} onChange={handleAvatarUpload} />
                  <Figure.Image
                    alt={currentUser.full_name}
                    src={currentUser.avatar}
                  />
                </div>
                <Row className="justify-content-center">
                  <Col className="my-auto" md="8" lg="8">
                    {errorText && <div className="text-danger">{errorText}</div>}
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className={`form-group ${errors.first_name ? 'has-error' : ''}`}>
                        <input
                          id="inputFirstName"
                          type="text"
                          name="first_name"
                          defaultValue={currentUser.first_name}
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
                      <div className={`form-group ${errors.last_name ? 'has-error' : ''}`}>
                        <input
                          id="inputLastName"
                          type="text"
                          name="last_name"
                          defaultValue={currentUser.last_name}
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
                      <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                        <input
                          id="inputEmailAddress"
                          type="email"
                          name="email"
                          defaultValue={currentUser.email}
                          ref={register({
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: t('auth:pattern', { attribute: t('auth:email').toLowerCase() }),
                            },
                            required: t('auth:required', { attribute: t('auth:email').toLowerCase() }),
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
                      <div className={`form-group ${errors.phone_number ? 'has-error' : ''}`}>
                        <input
                          id="inputPhoneNumber"
                          type="number"
                          name="phone_number"
                          defaultValue={currentUser.phone_number}
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
                        {errors.phone_number && <p className="text-danger mt-2">{errors.additional_phone_number.message}</p>}
                      </div>
                      <div className={`form-group ${errors.additional_phone_number ? 'has-error' : ''}`}>
                        <input
                          id="inputPhoneNumber"
                          type="number"
                          name="additional_phone_number"
                          defaultValue={currentUser.additional_phone_number}
                          ref={register({
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
                          {t('auth:add_phone_number')}
                        </label>
                        <i className="bar" />
                        {errors.additional_phone_number && <p className="text-danger mt-2">{errors.additional_phone_number.message}</p>}
                      </div>

                      <div className={`form-group ${errors.address ? 'has-error' : ''}`}>
                        <input
                          id="inputAddress"
                          type="text"
                          name="address"
                          defaultValue={currentUser.address}
                          ref={register({})}
                        />
                        <label
                          htmlFor="inputAddress"
                          className="control-label">
                          {t('auth:delivery-address')}
                        </label>
                        <i className="bar" />
                        {errors.address && <p className="text-danger mt-2">{errors.address.message}</p>}
                      </div>
                      <div className={`form-group ${errors.state ? 'has-error' : ''}`}>
                        <Form.Control
                          as="select"
                          id="inputState"
                          name="state"
                          defaultValue={currentUser.state}
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
                          defaultValue={currentUser.city}
                          ref={register({})}
                        />
                        <label
                          htmlFor="inputCity"
                          className="control-label">
                          {t('auth:city-village')}
                        </label>
                        <i className="bar" />
                        {errors.city && <p className="text-danger mt-2">{errors.city.message}</p>}
                      </div>
                      <div className={`form-group ${errors.post_index ? 'has-error' : ''}`}>
                        <input
                          id="inputPostCode"
                          type="number"
                          name="post_index"
                          defaultValue={currentUser.post_index}
                          ref={register({
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
                          htmlFor="inputPostCode"
                          className="control-label">
                          {t('auth:postal-index')}
                        </label>
                        <i className="bar" />
                        {errors.post_index && <p className="text-danger mt-2">{errors.post_index.message}</p>}
                      </div>
                      <a href="#" onClick={handleShow}>
                        <ins>{t('auth:change-password')}</ins>
                      </a>
                      <div className="form-group float-right mt-5">
                        <Button
                          variant="secondary"
                          type="submit"
                          className="text-white text-uppercase"
                          disabled={loading}>
                          {t('auth:btn-save')}
                          {loading && <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="ml-2"
                          />}
                        </Button>
                      </div>
                    </form>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
          <Modal show={show} size="lg" onHide={handleClose} animation={false}>
            <Modal.Header>
              <a href="#" className="close" onClick={handleClose}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.6165 10.9751L21.7355 1.88046C21.9157 1.67059 22.0099 1.40063 21.9992 1.12453C21.9885 0.848423 21.8737 0.586513 21.6778 0.391133C21.4819 0.195753 21.2193 0.0812934 20.9425 0.0706288C20.6656 0.0599641 20.3949 0.153879 20.1845 0.333606L11.0655 9.42822L1.9465 0.322636C1.73936 0.116056 1.45843 0 1.1655 0C0.872566 0 0.591632 0.116056 0.384498 0.322636C0.177364 0.529216 0.0609969 0.809398 0.0609969 1.10155C0.0609969 1.3937 0.177364 1.67388 0.384498 1.88046L9.5145 10.9751L0.384498 20.0697C0.269348 20.168 0.175826 20.2891 0.1098 20.4252C0.0437743 20.5613 0.00667115 20.7095 0.00081971 20.8606C-0.00503173 21.0117 0.0204943 21.1623 0.0757963 21.3031C0.131098 21.4439 0.214982 21.5718 0.322183 21.6787C0.429383 21.7856 0.557585 21.8692 0.698742 21.9244C0.8399 21.9796 0.990966 22.005 1.14246 21.9992C1.29395 21.9933 1.44259 21.9563 1.57906 21.8905C1.71554 21.8246 1.83689 21.7314 1.9355 21.6165L11.0655 12.5219L20.1845 21.6165C20.3949 21.7963 20.6656 21.8902 20.9425 21.8795C21.2193 21.8688 21.4819 21.7544 21.6778 21.559C21.8737 21.3636 21.9885 21.1017 21.9992 20.8256C22.0099 20.5495 21.9157 20.2795 21.7355 20.0697L12.6165 10.9751Z" fill="#36424D"/>
                </svg>
              </a>
            </Modal.Header>
            <form onSubmit={handleSubmit(onPasswordChange)}>
              <Modal.Body>
                {passwordChanged.message && <Alert variant={`${passwordChanged.success ? 'success' : 'warning'}`}>
                  {passwordChanged.message}
                </Alert>}
                <div className={`form-group mb-3 ${errors.current_password ? 'has-error' : ''}`}>
                  <input
                    id="inputCurrentPassword"
                    type="password"
                    name="current_password"
                    ref={register({
                      required: t('auth:required', { attribute: t('auth:current-password').toLowerCase() }),
                      minLength: {
                        value: 6,
                        message: t('auth:min', { attribute: t('auth:current-password').toLowerCase(), min: 6 })
                      }
                    })}
                    required
                  />
                  <label
                    htmlFor="inputCurrentPassword"
                    className="control-label">
                    {t('auth:current-password')}
                  </label>
                  <i className="bar" />
                  {errors.current_password && <p className="text-danger mt-2">{errors.current_password.message}</p>}
                </div>
                <div className={`form-group mb-3 ${errors.password ? 'has-error' : ''}`}>
                  <input
                    id="inputPassword"
                    type="password"
                    name="password"
                    ref={register({
                      required: t('auth:required', { attribute: t('auth:new-password').toLowerCase() }),
                      minLength: {
                        value: 6,
                        message: t('auth:min', { attribute: t('auth:new-password').toLowerCase(), min: 6 })
                      }
                    })}
                    required
                  />
                  <label
                    htmlFor="inputPassword"
                    className="control-label">
                    {t('auth:new-password')}
                  </label>
                  <i className="bar" />
                  {errors.password && <p className="text-danger mt-2">{errors.password.message}</p>}
                </div>
                <div className={`form-group mb-3 ${errors.confirm_password?.type ? 'has-error' : ''}`}>
                  <input
                    id="inputConfirmPassword"
                    type="password"
                    name="password_confirmation"
                    ref={register({
                      required: t('auth:confirm-required'),
                        validate: (value) => value === watch('password') || t('auth:password-not-match'),
                    })}
                    required
                  />
                  <label
                    htmlFor="inputConfirmPassword"
                    className="control-label">
                    {t('auth:confirm-password')}
                  </label>
                  <i className="bar" />
                  {errors.password_confirmation && <p className="text-danger mt-2">{errors.password_confirmation.message}</p>}
                </div>
              </Modal.Body>
              <Modal.Footer>
                <a href="#" onClick={handleClose}>
                  {t('auth:btn-cancel')}
                </a>
                <Button type="submit" variant="secondary text-uppercase text-white ml-4">
                  {t('auth:btn-save')}
                </Button>
              </Modal.Footer>
            </form>
          </Modal>
        </div>
      </DefaultLayout>
    </>
  );
};

export default withAuth(Account);
