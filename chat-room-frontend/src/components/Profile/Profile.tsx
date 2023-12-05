import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { ProfileProps } from 'src/Utils/Interfaces';
import { CSSProperties } from 'react';
import {ProfilePicture} from "../../Utils/Enums";

function Profile(props: ProfileProps) {

    const stats = props.stats;
    const username = props.username;
    const isInHeader = props.isInHeader | false;
    const profilePicPath = props.profilePic as keyof typeof ProfilePicture;

    let backgroundImage = 'none'

    const renderTooltip = (props: any) => (
        <Tooltip id="button-tooltip" {...props}>
          {username} Played: {stats.gamesPlayed} Survived: {stats.gamesWon}
        </Tooltip>
      );

    if (stats?.gamesPlayed >= 1000) {
       backgroundImage = 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)'
    }

    const findBackgroundColor = (played:number):string => {
        if(played){
            const breakpoints: number[] = [3, 10, 25, 100, 300, 1000]
            const backgroundColors: string[] = ['black', 'gray', 'red', '#CD7F32', '#C0C0C0', '#FFD700']
            // want to look through number and get index  of array that is filtered through a callback function
            // the callback function will look for breakpoints that are less than played
            const colorIndex:number = breakpoints.filter((breakpoint: number) => {return breakpoint<played}).length
            return backgroundColors[colorIndex]
        } else {
            return '#000000'
        }
    }

    const findBorderColor = (wins:number, games:number):string => {

        const breakPoints = [.10, .25, .45, .50, .55, .65, .70]
        const borderColors = ['black', 'gray', 'red', '#CD7F32', '#C0C0C0', '#FFD700', 'violet', 'indigo']

        const ratio = wins/games
        const rankTier:number = breakPoints.filter((breakpoint:number)=>{return ratio>breakpoint}).length

        return borderColors[rankTier]
    }

    // make a conditional variable that depends on what component uses the profile
    let squareSize = '96px'
    let fontSize = '1rem'
    const userText = username
    let isTooltipDisabled = false
    let visibility: CSSProperties['visibility'] = 'visible'

    if (isInHeader) {
        squareSize = '64px'
        fontSize = '0.8rem'
        isTooltipDisabled = true
        visibility = 'hidden'
    }

    const renderCard = () => (
        <Card style={{width: squareSize, height: squareSize, padding: '5px', backgroundColor: findBackgroundColor(stats.gamesPlayed), backgroundImage: backgroundImage, borderColor: findBorderColor(stats.gamesWon, stats.gamesPlayed), position: 'relative', margin:'.5rem' }}>
            <img src={profilePicPath} alt="Profile" style={{ objectFit: 'fill', borderRadius: '1rem', border: 'solid', borderColor: findBorderColor(stats.gamesWon, stats.gamesPlayed)}} />
            <Card.Text style={{ visibility: visibility, fontSize: fontSize, fontWeight: 'bold', position: 'absolute', bottom: '-10px', left: '0', right: '0', textAlign: 'center', color: 'white', background: 'rgba(0, 0, 0, 0.5)', padding: '5px', borderRadius:'50%' }}>
                {userText}
            </Card.Text>
        </Card>
    )

    return isTooltipDisabled ? renderCard() : (
        <OverlayTrigger placement="left" overlay={renderTooltip}>
            {renderCard()}
        </OverlayTrigger>
    );
}

export default Profile
