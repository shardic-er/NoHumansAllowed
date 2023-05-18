import Card from 'react-bootstrap/Card';

function Chat(props: {message: string, username: string}) {

    return <>
        <Card style={{ width: 'auto', textAlign:'left', padding: '20px', margin: '30px'}}>
        <Card.Body style={{padding: '.5em'}}>
            <Card.Title>{props.username}</Card.Title>
            <Card.Text>{props.message}</Card.Text>
        </Card.Body>
        </Card>
    </>
}

export default Chat
