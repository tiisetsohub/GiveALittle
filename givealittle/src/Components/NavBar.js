import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap"
import { Link } from "react-router-dom";
import { MdAddShoppingCart } from "react-icons/md";
import { BsFillSuitHeartFill } from "react-icons/bs";


const NavBar = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="/home">Givealittle Demo</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/Category">Category</Nav.Link>
                        <Nav.Link href="#pricing">Sale</Nav.Link>
                        <NavDropdown title="Sign in/Sign up" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Sign in</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Create New Account</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Continue as Guest</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#seller">Sell on Givealittle</Nav.Link>
                        <Nav.Link href="#wishlist"><BsFillSuitHeartFill/> Wishlist</Nav.Link>
                        <Nav.Link href="#cart"><MdAddShoppingCart/>Cart</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;