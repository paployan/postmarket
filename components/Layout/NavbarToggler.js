import { bool, func } from 'prop-types';

const NavbarToggler = ({ open, setOpen }) => {
  return (
    <div className={`navbar-burger ${open ? 'open' : ''}`}
      open={open}
      onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </div>
  );
};

NavbarToggler.propTypes = {
  open: bool.isRequired,
  setOpen: func.isRequired,
};

export default NavbarToggler;
