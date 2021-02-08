import Link from 'next/link';
import { Navbar, } from 'react-bootstrap';

const NavbarBrand = ({ classStr, width }) => (
  <Link href="/" passHref>
    <Navbar.Brand className={classStr}>
      <img
        src="/logo.png"
        alt="ՓոստՄարկետ"
        width={width}
      />
    </Navbar.Brand>
  </Link>
);

export default NavbarBrand;
