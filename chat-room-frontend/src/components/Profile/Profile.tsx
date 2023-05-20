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

    let backgroundColor : string = 'grey'
    let borderColor : string = '#222222'
    let backgroundImage : string = 'none'

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
    
    if (props.stats.gamesPlayed < 3) {
        backgroundColor = 'black'
    } else if (props.stats.gamesPlayed < 10) {
        backgroundColor = 'gray'
    } else if (props.stats.gamesPlayed < 25) {
        backgroundColor = 'red'
    } else if (props.stats.gamesPlayed < 100) {
        backgroundColor = '#CD7F32'
    } else if (props.stats.gamesPlayed < 300) {
        backgroundColor = '#C0C0C0'
    } else if (props.stats.gamesPlayed < 1000) {
        backgroundColor = '#FFD700'
    } else {
        backgroundColor = '#FFD700'
        backgroundImage = 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)'
    }

    console.log(Number(props.stats.gamesWon) / Number(props.stats.gamesPlayed))

    if ((props.stats.gamesWon / props.stats.gamesPlayed) < 0.1) {
        borderColor = '#000000'
    } else if ((props.stats.gamesWon / props.stats.gamesPlayed) < 0.25) {
        borderColor = 'gray'
    } else if ((props.stats.gamesWon / props.stats.gamesPlayed) < 0.45) {
        borderColor = 'red'
    } else if ((props.stats.gamesWon / props.stats.gamesPlayed) < 0.50) {
        borderColor = '#CD7F32'
    } else if ((props.stats.gamesWon / props.stats.gamesPlayed) < 0.55) {
        borderColor = '#C0C0C0'
    } else if ((props.stats.gamesWon / props.stats.gamesPlayed) < 0.65) {
        borderColor = '#FFD700'
    } else if ((props.stats.gamesWon / props.stats.gamesPlayed) < 0.70) {
        borderColor = 'indigo'
    } else {
        borderColor = 'violet'
    }

    return (
        <OverlayTrigger placement="left" overlay={renderTooltip}>     
            <Card style={{width: '96px', height: '96px', padding: '5px', backgroundColor: backgroundColor, backgroundImage: backgroundImage, borderColor: borderColor, position: 'relative', margin:'.5rem' }}>
                <img src={imgURL} alt="Profile" style={{ objectFit: 'fill', borderRadius: '1rem', border: 'solid', borderColor: borderColor}} />
                <Card.Text style={{ fontWeight: 'bold', position: 'absolute', bottom: '-10px', left: '0', right: '0', textAlign: 'center', color: 'white', background: 'rgba(0, 0, 0, 0.5)', padding: '5px', borderRadius:'50%' }}>
                    {isSpectator ? "Spectator" : "Player"}
                </Card.Text>
            </Card>
        </OverlayTrigger>
    );
}

export default Profile
