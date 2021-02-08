import Link from 'next/link';
import { bool } from 'prop-types';
import { Nav } from 'react-bootstrap';
import useTranslation from 'next-translate/useTranslation';

const NavbarMobile = ({ open, setOpen }) => {
  const { t } = useTranslation();
  return (
    <Nav className={`navbar-mobile ${open ? 'open' : ''}`}>
      <Link href="/" passHref>
        <Nav.Link className="p-2" eventKey={1} onSelect={() => setOpen(!open)}>
          {t('menu:general')}
        </Nav.Link>
      </Link>
      <Link href="/p/what-is-postmarket" passHref>
        <Nav.Link className="p-2" eventKey={2} onSelect={() => setOpen(!open)}>
          {t('menu:what-is-postmarket')}
        </Nav.Link>
      </Link>
      <Link href="/p/how-to-order" passHref>
        <Nav.Link className="p-2" eventKey={3} onSelect={() => setOpen(!open)}>
          {t('menu:how-to-order')}
        </Nav.Link>
      </Link>
      <Link href="/p/payment-method" passHref>
        <Nav.Link className="p-2" eventKey={4} onSelect={() => setOpen(!open)}>
          {t('menu:payment-method')}
        </Nav.Link>
      </Link>
      <Link href="/p/delivery" passHref>
        <Nav.Link className="p-2" eventKey={5} onSelect={() => setOpen(!open)}>
          {t('menu:delivery')}
        </Nav.Link>
      </Link>
    </Nav>
  )
}

NavbarMobile.propTypes = {
  open: bool.isRequired,
}

export default NavbarMobile;
