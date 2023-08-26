import React from "react";
import { Nav, Navbar, Container, Button, NavDropdown } from "react-bootstrap";
import { useLogoutUserMutation } from "../services/appApi";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets//logooo-removebg-preview.png";
import "./navbar.css";


function Navigation() {
    const user = useSelector((state) => state.user);
    const [logoutUser] = useLogoutUserMutation();
    async function handleLogout(e) {
        e.preventDefault();
        await logoutUser(user);
        // redirect to home page
        window.location.replace("/");
    }

    return (
    //    bg="light" expand="lg"
        <Navbar  className="nav">
            <Container>
                
                <LinkContainer to="/">
                    
                    <Navbar.Brand>
                        <img  className="logo"  src={logo} style={{ width: 70, height: 60 }} />
                    </Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {!user && (
                            //WE have provided a link inside a linkcontainer 
                            <LinkContainer   to="/login">
                                <Nav.Link    ><h2 className="login">LogIn</h2></Nav.Link>
                            </LinkContainer>
                        )}

                        <LinkContainer   to="/chat">
                            <Nav.Link><h2 className="chat">Chat</h2></Nav.Link>
                        </LinkContainer>

                        {user && (
                            <NavDropdown
                                title={
                                    <>
                                        <img src={user.picture} style={{ width: 30, height: 30, marginRight: 10, objectFit: "cover", borderRadius: "50%" }} />
                                        {user.name}
                                    </>
                                }
                                id="basic-nav-dropdown"
                            >
                                <NavDropdown.Item href="#action/3.1">Setting</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Privacy</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Linked Devices</NavDropdown.Item>

                                <NavDropdown.Item>
                                    <Button variant="danger" onClick={handleLogout}>
                                        Logout
                                    </Button>
                                </NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;
