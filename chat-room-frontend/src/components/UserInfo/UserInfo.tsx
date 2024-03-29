import Card from 'react-bootstrap/Card';
import {AppUser, Stats} from "../../Utils/Interfaces";
import Profile from '../Profile/Profile';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {ProfilePicture} from "../../Utils/Enums";

// This component takes in a user object.
// It will have no child components

function UserInfo(props: { user: AppUser }) {

    const username: string = props.user.username;
    const played: number = props.user.stats.gamesPlayed;
    const wins: number = props.user.stats.gamesWon;
    const userStats: Stats = props.user.stats;
    const profilePic: string = props.user.profilePicture;

    const findRank = (wins: number, games: number): string => {

        const breakPoints = [.10, .25, .45, .50, .55, .65, .70]
        const ranks = ['Human in Hiding', 'NOT A ROBOT', 'Abstract personhood', 'NO HUMANS HERE', 'THIS IS NOT THE HUMAN YOU ARE LOOKING FOR', 'AI CORE', 'AI HARDCORE', 'CHATGPT']

        const ratio = wins / games
        const rankTier: number = breakPoints.filter((breakpoint: number) => {
            return ratio > breakpoint
        }).length

        return ranks[rankTier]
    }

    return <>
        {/* <Card style={{ width: 'auto', textAlign:'left', padding: '0px'}}> */}
        <Row className="d-flex align-items-center" style={{padding: '3px'}}>
            <Col xs={3} style={{padding: '0'}}>
                {/* <Card.Body style={{padding: '0', width: 'auto'}}> */}
                <Profile
                    profilePic={profilePic}
                    username={username}
                    stats={userStats}
                    key={0}
                    isInHeader={true}
                />
                {/* </Card.Body> */}
            </Col>
            <Col xs={9} style={{padding: '0', textAlign: 'left'}}>
                <Card.Body style={{padding: '3px', margin: '0', minWidth: '250px'}}>
                    {/* <Card.Title>{username}</Card.Title> */}
                    <Card.Subtitle style={{
                        padding: '5px',
                        margin: '0',
                        color: 'grey'
                    }}>{username}: {findRank(wins, played)}</Card.Subtitle>
                    <Card.Text style={{color: 'grey'}}>
                        Games Played: {played} Survived: {wins}
                    </Card.Text>
                </Card.Body>
            </Col>
        </Row>
        {/* </Card> */}

    </>
}

export default UserInfo
