import { useState } from 'react';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import useTranslation from 'next-translate/useTranslation';
import AuthService from '../../services/auth.service';
import { useAuth } from '../../services/useAuth';
import DefaultLayout from '../../components/Layout/DefaultLayout';

const Register = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { setCurrentUser, setAuthenticated } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    errors,
    formState,
    watch
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (formData) => {
    setLoading(true);
    formData.locale = router.locale;
    AuthService.register(formData)
      .then(res => {
        if (res.message) {
          AuthService.login(formData.email, formData.password)
            .then(data => {
              if (data.loggedIn) {
                setAuthenticated(true);
                setCurrentUser(data.user);
                router.push('/account/personal-information');
              }
            })
        }
      })
      .catch(err => {
        err.text().then(errorMessage => {
          const { errors } = JSON.parse(errorMessage);
          // eslint-disable-next-line no-restricted-syntax
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

  return (
    <>
      <Head>
        <title>{t('menu:register')} | Postmarket</title>
        <meta name="description" content={t('common:description')} />
      </Head>
      <DefaultLayout>
        <div className="site-content mt-7">
          <Container className="container-fluid px-2">
            <Row className="justify-content-center">
              <Col className="my-auto" md={8} lg={5}>
                <h1 className="page-heading text-uppercase text-center">
                  {t('menu:register')}
                </h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className={`form-group ${errors.first_name ? 'has-error' : ''}`}>
                    <input
                      id="inputFirstName"
                      type="text"
                      name="first_name"
                      required
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
                      required
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
                      ref={register({
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: t('auth:pattern', { attribute: t('auth:email').toLowerCase() }),
                        },
                        required: t('auth:required', { attribute: t('auth:email').toLowerCase() }),
                        maxLength: {
                          value: 100,
                          message: t('auth:max', { attribute: t('auth:email').toLowerCase(), max: 100 })
                        },
                      })}
                      required
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
                      required
                    />
                    <label
                      htmlFor="inputPhoneNumber"
                      className="control-label">
                      {t('auth:phone_number')}
                    </label>
                    <i className="bar" />
                    {errors.phone_number && <p className="text-danger mt-2">{errors.phone_number.message}</p>}
                  </div>
                  <div className={`form-group mb-3 ${errors.password ? 'has-error' : ''}`}>
                    <input
                      id="inputPassword"
                      type="password"
                      name="password"
                      ref={register({
                        required: t('auth:required', { attribute: t('auth:password').toLowerCase() }),
                        minLength: {
                          value: 6,
                          message: t('auth:min', { attribute: t('auth:password').toLowerCase(), min: 6 })
                        }
                      })}
                      required
                    />
                    <label
                      htmlFor="inputPassword"
                      className="control-label">
                      {t('auth:password')}
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
                  <div className={`checkbox w-65 ${errors.agree ? 'has-error' : ''}`}>
                    <label>
                      <input
                        type="checkbox"
                        name="agree"
                        ref={register({
                          required: t('auth:agree-required'),
                        })}
                        required
                      />
                      <i className="helper" />
                      {t('auth:agree')}
                    </label>
                  </div>
                  <div className="form-group mt-5">
                    <Button
                      variant="secondary"
                      type="submit"
                      className="btn text-uppercase text-white"
                      disabled={!formState.isValid || loading}>
                      {t('auth:btn-register')}
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
          </Container>
        </div>
      </DefaultLayout>
    </>
  );
};

export default Register;
