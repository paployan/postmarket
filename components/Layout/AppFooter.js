import React from 'react'
import Link from 'next/link';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import useTranslation from 'next-translate/useTranslation';
import NavbarBrand from './NavbarBrand';

export default function AppFooter() {
  const { t } = useTranslation();
  return (
    <footer>
      <Container className="contaiener-fluid">
        <Row xs={1} md={3} lg={5}>
          <Col>
            <NavbarBrand width="75%" classStr="my-3" />
            <p>{t('menu:app-name')} © 2020</p>
            <p>{t('common:copyright')}</p>
          </Col>
          <Col>
            <h5 className="text-uppercase text-gray-light my-4">
              {t('menu:about-us')}
            </h5>
            <Nav className="flex-column nav-links">
              <Link href="/p/our-partners" passHref>
                <Nav.Link eventKey={1}>
                  {t('menu:our-partners')}
                </Nav.Link>
              </Link>
              <Link href="/p/what-is-postmarket" passHref>
                <Nav.Link eventKey={2}>
                  {t('menu:what-is-postmarket')}
                </Nav.Link>
              </Link>
              <Link href="/p/how-to-order" passHref>
                <Nav.Link eventKey={3}>
                  {t('menu:how-to-order')}
                </Nav.Link>
              </Link>
              <Link href="/p/payment-method" passHref>
                <Nav.Link eventKey={4}>
                  {t('menu:payment-method')}
                </Nav.Link>
              </Link>
              <Link href="/p/delivery" passHref>
                <Nav.Link eventKey={5}>
                  {t('menu:delivery')}
                </Nav.Link>
              </Link>
            </Nav>
          </Col>
          <Col>
            <h5 className="text-uppercase text-gray-light my-4">
              {t('menu:useful-links')}
            </h5>
            <Nav defaultActiveKey="/" className="flex-column nav-links">
              <Link href="/p/terms-and-conditions" passHref>
                <Nav.Link eventKey={1}>
                  {t('menu:terms')}
                </Nav.Link>
              </Link>
              <Link href="/p/become-a-partner" passHref>
                <Nav.Link eventKey={2}>
                  {t('menu:become-a-partner')}
                </Nav.Link>
              </Link>
            </Nav>
          </Col>
          <Col>
            <h5 className="text-uppercase text-gray-light my-4">
              {t('menu:payment-methods')}
            </h5>
            <Nav className="flex-column nav-links">
              <Nav.Link href="/p/cash">
                {t('menu:cash')}
              </Nav.Link>
            </Nav>
          </Col>
          <Col>
            <h5 className="text-uppercase text-gray-light my-4">
              {t('menu:contact-us')}
            </h5>
            <p className="mb-2">
              {t('menu:contact-address')}
            </p>
            <p className="mb-2">
              {t('menu:contact-number')} <a href="tel:+37410514514" className="text-white">+374 (10) 514-514</a>
            </p>
            <p className="mb-2">
            {t('menu:contact-email')} <a href="mailto:postmarket@haypost.am" className="text-white">postmarket@haypost.am</a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
