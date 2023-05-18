import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import UserInfo from '../UserInfo/UserInfo';
import {AppUser} from "../../Utils/Interfaces";

// ¿This component needs the webtoken for who is logged in?
// It also needs the user object to pass to the UserInfo card
// Count/setcount are examples of how to change the variable

function InfoHeader(props: {user:AppUser}) {
    const {user} = props;

    return (
        <Navbar bg="dark" expand="lg" variant="dark" fixed="top">
        <Container>
            <Nav className="me-auto">
                <UserInfo user={user}/>
            </Nav>
            <Nav className="mx-auto">
            <Navbar.Brand href="#navToUserSettingsPage">No Humans Allowed</Navbar.Brand>
            </Nav>
            <Nav>
            <NavDropdown title="Menu" id="basic-nav-dropdown">
              <NavDropdown.Item>Account</NavDropdown.Item>
              <NavDropdown.Item>Stats</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>Logout</NavDropdown.Item>
            </NavDropdown>
            </Nav>
        </Container>
        </Navbar>
  );
}

export default InfoHeader;