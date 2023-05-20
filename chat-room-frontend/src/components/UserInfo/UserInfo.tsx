import Card from 'react-bootstrap/Card';
// import {AppUser} from "../../Utils/Interfaces";
import Profile from '../Profile/Profile';
// import { Stats } from '../../Utils/Interfaces';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// This component takes in a user object.
// It will have no child components

function UserInfo(props: {user: AppUser}) {

    const username: string = props.user.username;
    const played: number = props.user.stats.gamesPlayed;
    const wins: number = props.user.stats.gamesWon;
    const userStats: Stats = props.user.stats;

    return <>
        {/* <Card style={{ width: 'auto', textAlign:'left', padding: '0px'}}> */}
            <Row className="d-flex align-items-start">
                <Col xs={4} style={{padding: '3px'}}>
                    {/* <Card.Body style={{padding: '0', width: 'auto'}}> */}
                        <Profile
                            imgURL={'src/assets/accuser.png'}
                            isSpectator={false}
                            username={username}
                            stats={userStats}
                            key={0}
                            parentComponent={'UserInfo'}
                            />
                    {/* </Card.Body> */}
                </Col>
                <Col xs={8} style={{padding: '3px', textAlign:'left'}}>
                    <Card.Body style={{padding: '5px', margin: '8px'}}>
                        {/* <Card.Title>{username}</Card.Title> */}
                        <Card.Subtitle style={{padding: '0'}} className="mb-1 text-muted">Human in Hiding</Card.Subtitle>
                        <Card.Text>
                        Games Played: {played}<br></br>Survived: {wins}
                        </Card.Text>
                    </Card.Body>
                </Col>
            </Row>
        {/* </Card> */}
        
    </>
}

export default UserInfo
