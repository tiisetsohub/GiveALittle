import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap"
import { Link } from "react-router-dom";

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
                        <Nav.Link href="#deets">More Items</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            Even More Items
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;