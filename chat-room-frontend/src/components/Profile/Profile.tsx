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

function Profile(props: {imgURL?: string,  isSpectator: boolean}) {

    let {imgURL} = props.imgURL;
    const {isSpectator} = props.isSpectator;

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

    return (
        <Card style={{ width: '96px', height: '96px', padding: '5px', backgroundColor: 'grey', borderColor: '#222222', position: 'relative', margin:'.5rem' }}>
            <img src={imgURL} alt="Profile" style={{ objectFit: 'fill', borderRadius: '1rem' }} />
            <Card.Text style={{ fontWeight: 'bold', position: 'absolute', bottom: '-10px', left: '0', right: '0', textAlign: 'center', color: 'white', background: 'rgba(0, 0, 0, 0.5)', padding: '5px', borderRadius:'50%' }}>
                {isSpectator ? "Spectator" : "Player"}
            </Card.Text>
        </Card>
    );
}

export default Profile
