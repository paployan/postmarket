import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Container, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
import useTranslation from 'next-translate/useTranslation';
import withoutAuth from '../../services/withoutAuth';
import DefaultLayout from '../../components/Layout/DefaultLayout';

export default withoutAuth(function ResetPassword () {
  const { t } = useTranslation();
  const [isSuccess, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordReset, setPasswordReset] = useState(null);
  const router = useRouter();
  const { token, email } = router.query;

  const {
    register,
    handleSubmit,
    errors,
    formState,
    setError,
    watch,
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (formData) => {
    setPasswordReset(null);
    setLoading(true);
    const body = { ...formData, token, email };
    fetch(`/api/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then(async response => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    })
    .then(() => {
      e.target.reset();
      setLoading(false);
      setSuccess(true);
    })
    .catch(err => {
      setLoading(false);
      err.text().then(errorMessage => {
        const { errors } = JSON.parse(errorMessage);
        if (errors.password) {
          setError('password', {
            type: 'manual',
            message: errors.password[0],
          });
        }
        if (errors.email) {
          setPasswordReset(errors.email[0]);
        }
      })
    });
  };

  return (
    <>
      <Head>
        <title>{t('auth:enter-new-password')} | Postmarket</title>
        <meta name="description" content={t('common:description')} />
      </Head>
      <DefaultLayout>
        <div className="site-content mt-7">
          <Container className="container-fluid px-2">
            <Row className="justify-content-center">
              <Col className="my-auto" md={8} lg={5}>
                <h1 className="page-heading text-uppercase text-center">
                  {t('auth:enter-new-password')}
                </h1>
                {isSuccess && <Alert variant="success">Ձեր գաղտնաբառը վերականգնվել է</Alert>}
                {passwordReset && <Alert variant="danger">{passwordReset}</Alert>}
                <form onSubmit={handleSubmit(onSubmit)}>
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
                  <div className={`form-group mb-3 ${errors.confirm_password ? 'has-error' : ''}`}>
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
                  <div className="form-group mt-5">
                    <Button
                      variant="secondary"
                      type="submit"
                      className="btn text-uppercase text-white"
                      disabled={!formState.isValid || loading}>
                      {t('auth:btn-change')}
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
