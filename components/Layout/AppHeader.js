import Link from 'next/link';
import { connect } from 'react-redux';
import { useState } from 'react';
import {
  Container,
  Navbar,
  Nav,
  Badge,
} from 'react-bootstrap';
import useTranslation from 'next-translate/useTranslation';
import NavbarToggler from './NavbarToggler';
import NavbarMobile from './NavbarMobile';
import { Cart } from '../SVG';
import { useAuth, useIsAuthenticated } from '../../services/useAuth';
import NavbarBrand from './NavbarBrand';
import NavbarSupportPhone from './NavbarSupportPhone';
import ChangeLanguage from './ChangeLanguage';

const Header = ({ cartItemsCount }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const isAuthenticated = useIsAuthenticated();
  const { currentUser, setCurrentUser, setAuthenticated } = useAuth();
  const handleLogout = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/auth/logout`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    setAuthenticated(response.status !== 200);
    setCurrentUser({});
  };
  return (
    <>
      <Navbar bg="primary" expand="md">
        <Container className="container-fluid">
          <NavbarToggler open={open} setOpen={setOpen} />
          <NavbarMobile open={open} setOpen={setOpen} />
          <NavbarBrand />
          <NavbarSupportPhone />
          {!isAuthenticated ? <Nav className="navbar-right">
            <Link href="/auth/login" passHref>
              <Nav.Link eventKey={1}>
                {t('menu:login')}
              </Nav.Link>
            </Link>
            <Link href="/auth/register" passHref>
              <Nav.Link eventKey={2}>
                {t('menu:register')}
              </Nav.Link>
            </Link>
            <Link href="/cart" passHref>
              <Nav.Link eventKey={3} className="position-relative">
                <Cart />
                {!!cartItemsCount && <Badge pill variant="light" className="badge-cart-items">
                  {cartItemsCount}
                </Badge>}
              </Nav.Link>
            </Link>
          </Nav> : <Nav className="navbar-right">
            <Link href="/account/personal-information" passHref>
              <Nav.Link eventKey={1}>{ currentUser.full_name }</Nav.Link>
            </Link>
            <Link href='#'>
              <Nav.Link eventKey={3} onClick={(e) => handleLogout(e)}>
                {t('menu:logout')}
              </Nav.Link>
            </Link>
            <Link href="/cart" passHref>
              <Nav.Link eventKey={3} className="position-relative">
                <Cart />
                {!!cartItemsCount && <Badge pill variant="light" className="badge-cart-items">
                  {cartItemsCount}
                </Badge>}
              </Nav.Link>
            </Link>
          </Nav>}
        </Container>
      </Navbar>
      <Navbar id="navbar-main" bg="primary" className="bottom-navbar">
        <Container className="container-fluid">
          <Navbar.Collapse>
            <Nav />
          </Navbar.Collapse>
          <Navbar.Collapse>
            <Nav defaultActiveKey={1} className="ml-auto">
              <Link href="/" passHref>
                <Nav.Link eventKey={1}>
                  {t('menu:general')}
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
          </Navbar.Collapse>
          <Navbar.Collapse>
            <ChangeLanguage />
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {open && <style jsx={open.toString()}>{`
        body {
          overflow: hidden;
        }
      `}</style>}
    </>
  );
}

const mapStateToProps = (state) => ({
  cartItemsCount: state.cart.cartItems.length,
  cart: state.cart,
});

export default connect(mapStateToProps, null)(Header);
