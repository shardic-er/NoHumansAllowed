import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function InfoHeader(props: {count: number, setCount:React.Dispatch<any>}) {
    const {count, setCount} = props;

    setCount(count);

    return (
        <Navbar bg="dark" expand="lg" variant="dark" fixed="top">
        <Container>
            <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
            </Nav>
            <Nav className="mx-auto">
            <Navbar.Brand href="#navToUserSettingsPage">No Humans Allowed {count}</Navbar.Brand>
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