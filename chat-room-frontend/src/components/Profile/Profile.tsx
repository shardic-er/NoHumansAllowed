import Card from 'react-bootstrap/Card';

function Profile(props: {imgURL: string,  isSpectator: boolean}) {

    const {imgURL, isSpectator} = props;
    let XorO;

    (isSpectator == true) ? XorO = "X" : XorO = "O";

    return <>
        <Card style={{ width: '200px' }}>
        <Card.Img variant="top" src={imgURL} />
            <Card.Text>
                {XorO}
            </Card.Text>
        </Card>
    </>
}

export default Profile
