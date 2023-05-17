import Card from 'react-bootstrap/Card';

// This component takes in a user object.
// It will have no child components

function UserInfo(props:
    {user: {username:string
    password:string,
    stats: {gamesPlayed:number,
            gamesWon:number,
            gamesSurvived:number,
            gamesAbandoned:number}}}) {

    
    const username: string = props.user.username;
    const played: number = props.user.stats.gamesPlayed;
    const wins: number = props.user.stats.gamesWon;

    return <>
        <Card style={{ width: 'auto', textAlign:'left', padding: '0px'}}>
        <Card.Body style={{padding: '.5em'}}>
            <Card.Title>{username}</Card.Title>
            <Card.Subtitle className="mb-1 text-muted">Human in Hiding</Card.Subtitle>
            <Card.Text>
            Games Played: {played} Survived: {wins}
            </Card.Text>
        </Card.Body>
        </Card>
    </>
};

export default UserInfo
