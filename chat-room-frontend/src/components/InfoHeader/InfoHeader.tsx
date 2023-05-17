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
        <Navbar.Brand href="#navToUserSettingsPage">No Humans Allowed {count}</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
            </Nav>
            <Nav>
            <Nav.Link href="#logoutLink">Exit</Nav.Link>
            </Nav>
        </Container>
        </Navbar>
  );
}

export default InfoHeader;