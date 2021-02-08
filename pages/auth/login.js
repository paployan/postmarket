import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Container, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
import useTranslation from 'next-translate/useTranslation';
import DefaultLayout from '../../components/Layout/DefaultLayout';
import AuthService from '../../services/auth.service';
import withoutAuth from '../../services/withoutAuth';
import { useAuth } from '../../services/useAuth';

export default withoutAuth(function Login() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const { setCurrentUser, setAuthenticated } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    errors,
    formState
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = async ({ email, password }) => {
    try {
      setLoading(true);
      await AuthService.login(email, password, router.locale)
      .then(data => {
        if (data.loggedIn) {
          setAuthenticated(true);
          setCurrentUser(data.user);
          router.push('/account/personal-information');
        }
      })
    } catch (err) {
      setErrorMsg(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>{t('menu:login')} | Postmarket</title>
        <meta name="description" content={t('common:description')} />
      </Head>
      <DefaultLayout>
        <div className="site-content mt-7">
          <Container className="container-fluid px-2">
            <Row className="justify-content-center">
              <Col className="my-auto" md={8} lg={5}>
                <h1 className="page-heading text-uppercase text-center">
                  {t('menu:login')}
                </h1>
                {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className={`form-group ${errors.email?.type ? 'has-error' : ''}`}>
                    <input
                      id="inputEmailAddress"
                      type="email"
                      name="email"
                      ref={register({
                        required: t('auth:required', { attribute: 'email' }),
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: t('auth:pattern', { attribute: 'email' })
                        },
                        maxLength: {
                          value: 100,
                          message: t('auth:max', { attribute: 'email', max: 100 })
                        }
                      })}
                      required
                    />
                    <label
                      htmlFor="inputEmailAddress"
                      className="control-label">
                      {t('auth:email')}
                    </label>
                    <i className="bar" />
                  </div>
                  <div className={`form-group mb-3 ${errors.password?.type ? 'has-error' : ''}`}>
                    <input
                      id="inputPassword"
                      type="password"
                      name="password"
                      ref={register({
                        required: t('auth:required', { attribute: 'password' }),
                        minLength: {
                          value: 6,
                          message: t('auth:min', { attribute: 'email', min: 6 })
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
                  </div>
                  <div>
                    <Link href="/auth/forgot-password">
                      <a className="text-dark">
                        {t('auth:forgot-password')}
                      </a>
                    </Link>
                    <Link href="/auth/register">
                      <a className="text-dark float-right">
                        {t('menu:register')}
                      </a>
                    </Link>
                  </div>
                  <div className="form-group mt-5">
                    <Button
                      variant="secondary"
                      type="submit"
                      className="btn text-uppercase text-white"
                      disabled={!formState.isValid || loading}>
                      {t('menu:login')}
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
});
