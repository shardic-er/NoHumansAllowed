import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ChatWindow from '../ChatWindow/ChatWindow';

function ChatFrame() {


    return(
        <Container fluid className="w-100 bg-secondary" style={{width:"100%", height: '100vh', margin: '0px', padding: '0px'}}>
            <Row style={{ height: "80%" }}>
                <Col className="bg-primary" sm={10}>
                    Here goes chatroom component
                </Col>
                <Col className="bg-secondary d-flex justify-content-center" sm={2}>
                    Here goes spectator component
                </Col>
            </Row>
            <Row style={{ height: "20%" }} className="bg-secondary">
                <ChatWindow sendMessage = {""}/>
            </Row>
        </Container>
    )

}

export default ChatFrame;