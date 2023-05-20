import Card from 'react-bootstrap/Card';
import titleCard2 from "../../assets/accuser.png";
import titleCard3 from "../../assets/curiosity.png";
import titleCard4 from "../../assets/bazzmoz.png";
import titleCard5 from "../../assets/eureka.png";
import titleCard6 from "../../assets/detective.png";
import titleCard7 from "../../assets/minusone.png";
import titleCard8 from "../../assets/robohno.png";
import titleCard9 from "../../assets/sadgears.png";
import titleCard10 from "../../assets/sargentbolts.png";
import titleCard11 from "../../assets/scarytron.png";
import titleCard12 from "../../assets/sonny.png";
import titleCard13 from "../../assets/wattee.png";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { ProfileProps } from 'src/Utils/Interfaces';

function Profile(props: ProfileProps) {

    // What is going on here with the curly braces and why does it break things to remove them lol
    let {imgURL} = props.imgURL;
    const {isSpectator} = props.isSpectator;
    const stats = props.stats;
    const username = props.username;
    const parentComponent = props.parentComponent;

    let backgroundImage = 'none'

    const getRandomTitleCard = () => {

        const titleCards = [titleCard2,
            titleCard3, titleCard4, titleCard5, titleCard6,
            titleCard7, titleCard8, titleCard9, titleCard10,
            titleCard11, titleCard12, titleCard13,
        ]

        const index = Math.floor(Math.random() * titleCards.length);
        return titleCards[index];
    }

    if(!imgURL){
        imgURL = getRandomTitleCard()
    }

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          {username} Played: {stats.gamesPlayed} Survived: {stats.gamesWon}
        </Tooltip>
      );
    
    if (stats.gamesPlayed >= 1000) {
       backgroundImage = 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)'
    }

    const findBackgroundColor = (played:number):string => {
    
        const breakpoints: number[] = [3, 10, 25, 100, 300, 1000]
        const backgroundColors: string[] = ['black', 'gray', 'red', '#CD7F32', '#C0C0C0', '#FFD700']
        // want to look through number and get index  of array that is filtered through a callback function
        // the callback function will look for breakpoints that are less than played
        const colorIndex:number = breakpoints.filter((breakpoint: number) => {return breakpoint<played}).length
        return backgroundColors[colorIndex]
    }

    let backgroundColor : string = findBackgroundColor(stats.gamesPlayed)


    const findBorderColor = (wins:number, games:number):string => {

        const breakPoints = [.10, .25, .45, .50, .55, .65, .70]
        const borderColors = ['black', 'gray', 'red', '#CD7F32', '#C0C0C0', '#FFD700', 'violet', 'indigo']

        const ratio = wins/games
        const rankTier:number = breakPoints.filter((breakpoint:number)=>{return ratio>breakpoint}).length

        return borderColors[rankTier]

    }

    const borderColor : string = findBorderColor(stats.gamesWon, stats.gamesPlayed)


    // make a conditional variable that depends on what component uses the profile
    let squareSize: string = '96px'
    let fontSize: string = '1rem'
    let userText = isSpectator ? "Spectator" : "Player"
    let isTooltipDisabled: boolean = false
    let visibility: string = 'visible'
    
    if (parentComponent == "UserInfo") {
        squareSize = '65px'
        fontSize = '0.8rem'
        isTooltipDisabled = true
        visibility = 'hidden'
    }

    const renderCard = () => (
        <Card style={{width: squareSize, height: squareSize, padding: '5px', backgroundColor: backgroundColor, backgroundImage: backgroundImage, borderColor: borderColor, position: 'relative', margin:'.5rem' }}>
            <img src={imgURL} alt="Profile" style={{ objectFit: 'fill', borderRadius: '1rem', border: 'solid', borderColor: borderColor}} />
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
