import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap"
import { Link } from "react-router-dom";
import { MdAddShoppingCart } from "react-icons/md";
import { BsFillSuitHeartFill } from "react-icons/bs";

const NavBarBuyer = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="/home">Givealittle Demo</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/Category">Category</Nav.Link>
                        <Nav.Link href="#pricing">Sale</Nav.Link>

                    </Nav>
                    <Nav>
                        <Nav.Link href="#wishlist"><BsFillSuitHeartFill/> Wishlist</Nav.Link>
                        <Nav.Link as={Link} to="/Cart"><MdAddShoppingCart/>Cart</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBarBuyer;