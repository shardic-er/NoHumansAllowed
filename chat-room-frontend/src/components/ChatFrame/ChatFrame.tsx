import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ChatFrame() {


    return(
        <div className="w-100 bg-secondary" style={{width:"100%", height: '90vh', margin: '0px', marginTop: '100px', padding: '0px', border: '5px red' }}>
            <Row style={{ height: "85%" }}>
                <Col className="bg-primary" sm={10}>
                    Here goes chatroom component
                </Col>
                <Col className="bg-secondary d-flex justify-content-center" sm={2}>
                    Here goes spectator component
                </Col>
            </Row>
            <Row style={{ height: "15%" }} className="bg-secondary">
                <span>Here goes messaging component</span>
            </Row>
        </div>
    )

}

export default ChatFrame;