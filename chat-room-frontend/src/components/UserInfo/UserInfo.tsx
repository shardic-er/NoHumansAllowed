import Card from 'react-bootstrap/Card';
import {AppUser} from "../../Utils/Interfaces";
import Profile from '../Profile/Profile';
import { Stats } from '../../Utils/Interfaces';

// This component takes in a user object.
// It will have no child components

function UserInfo(props: {user: AppUser}) {

    const username: string = props.user.username;
    const played: number = props.user.stats.gamesPlayed;
    const wins: number = props.user.stats.gamesWon;
    const userStats: Stats = props.user.stats;

    return <>
        <Card style={{ width: 'auto', textAlign:'left', padding: '0px'}}>
        <Card.Body style={{padding: '.5em'}}>
            <Profile
                imgURL={'src/assets/accuser.png'}
                isSpectator={false}
                username={username}
                stats={userStats}
                parentComponent={'UserInfo'}
                />
            {/* <Card.Title>{username}</Card.Title> */}
            <Card.Subtitle className="mb-1 text-muted">Human in Hiding</Card.Subtitle>
            <Card.Text>
            Games Played: {played} Survived: {wins}
            </Card.Text>
        </Card.Body>
        </Card>
    </>
}

export default UserInfo
