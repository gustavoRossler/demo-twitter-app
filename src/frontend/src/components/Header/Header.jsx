import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

function Header() {
  const location = useLocation();
  const user = useSelector(state => state?.auth?.user);

  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand href="#home">Twitter App Demo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {location.pathname !== "/" && <NavLink to="/" className="ps-3 border-start">Home</NavLink>}
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <NavDropdown title={user.name} id="basic-nav-dropdown">
              <Link to="/logout" className='dropdown-item'>Logout</Link>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;