import { useState } from 'react';
import Head from 'next/head';
import { Container, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import withoutAuth from '../../services/withoutAuth';
import DefaultLayout from '../../components/Layout/DefaultLayout';

export default withoutAuth(function ForgotPassword () {
  const { t } = useTranslation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [passwordSent, setPasswordSent] = useState(null);
  const {
    register,
    handleSubmit,
    errors,
    formState,
    setError,
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (formData, e) => {
    setLoading(true);
    formData.locale = router.locale;
    fetch(`/api/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    }).then(async response => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    })
    .then(data => {
      setPasswordSent(data.message);
      e.target.reset();
      setLoading(false);
    })
    .catch(err => {
      setLoading(false);
      err.text().then(errorMessage => {
        const { errors } = JSON.parse(errorMessage);
        setError('email', {
          type: 'manual',
          message: errors.email[0],
        });
      })
    })
  };

  return (
    <>
      <Head>
        <title>{t('auth:forgot-password')} | Postmarket</title>
        <meta name="description" content={t('common:description')} />
      </Head>
      <DefaultLayout>
        <div className="site-content mt-7">
          <Container className="container-fluid px-2">
            <Row className="justify-content-center">
              <Col className="my-auto" md={8} lg={5}>
                <h1 className="page-heading text-uppercase text-center">
                  {t('auth:forgot-password')}
                </h1>
                {passwordSent && <Alert variant="success">{t('auth:password-sent')}</Alert>}
                <form onSubmit={handleSubmit(onSubmit)}>
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
                    {errors.email && <p className="text-danger mt-2">{errors.email.message}</p>}
                  </div>
                  <div className="form-group mt-5">
                    <Button
                      variant="secondary"
                      type="submit"
                      className="btn text-uppercase text-white"
                      disabled={!formState.isValid || loading}>
                      {t('auth:submit')} {loading && <Spinner
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
