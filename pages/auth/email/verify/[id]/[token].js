import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import useTranslation from 'next-translate/useTranslation';
import { useAuth } from '../../../../../services/useAuth';
import DefaultLayout from '../../../../../components/Layout/DefaultLayout';

function createMarkup(html) {
  return {__html: html};
};

function VerifyEmail() {
  const { t } = useTranslation();
  const { currentUser, setCurrentUser } = useAuth();
  const [result, setResult] = useState(null);
  const router = useRouter();
  const { id, token, expires, signature } = router.query;

  useEffect(() => {
    fetch(`/api/auth/email/verify/${id}/${token}?expires=${expires}&signature=${signature}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(async response => {
      const data = await response.json();
      if (!response.ok) {
        // eslint-disable-next-line no-throw-literal
        throw {
          statusCode: response.status,
          ...data,
        };
      }
      return data;
    }).then((res) => {
      if (currentUser) {
        currentUser.verified = true;
        setCurrentUser(currentUser);
      }

      if (res.verified) {
        setResult({
          status: 'success',
          message: t('auth:already-verified'),
          navigation: true,
        });
        return true;
      }

      setResult({
        status: 'success',
        message: t('auth:verify-success'),
        navigation: true,
      });
    })
    .catch((err) => {
      if (err.statusCode === 401) {
        setResult({
          status: 'danger',
          message: t('auth:verify-auth-required'),
        });
        return false;
      }
      
      if (err.statusCode === 403) {
        setResult({
          status: 'danger',
          message: t('auth:verify-failed'),
          failed: true,
        });
        return false;
      }
    });
  }, []);

  const resend = (e) => {
    e.preventDefault();
    
    fetch(`/api/auth/email/verification-notification`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(async response => {
      const data = await response.json();
      if (!response.ok) {
        // eslint-disable-next-line no-throw-literal
        throw {
          statusCode: response.status,
          ...data,
        };
      }
      return data;
    }).then((res) => {
      setResult({
        status: 'success',
        message: t('auth:verify-email-sent'),
      });
    }).catch((err) => {
      setResult({
        status: 'danger',
        message: t('common:error-server'),
      });
    });
  };

  return (
    <DefaultLayout>
      <div className="site-content mt-7">
        <Container className="container-fluid px-2">
          <Row className="justify-content-center">
            <Col className="my-auto text-center" md={8} lg={5}>
              {result && <Alert
                variant={result.status}>
                <div dangerouslySetInnerHTML={createMarkup(result.message)} />
                {result.navigation && <Link href="/account/personal-information">{t('auth:visit-profile')}</Link>}
                {result.failed && <a href="#" onClick={resend}>
                  {t('auth:resend')}
                </a>}
              </Alert>}
            </Col>
          </Row>
        </Container>
      </div>
    </DefaultLayout>
  );
};

export default VerifyEmail;
