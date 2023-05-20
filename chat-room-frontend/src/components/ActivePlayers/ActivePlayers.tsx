import {ListGroup} from "react-bootstrap";
import {AppUser} from "../../Utils/Interfaces";
import Profile from "../Profile/Profile";

function ActivePlayers(props:{playerList:AppUser[]}){

    const playerList = props.playerList

    const isPlayerSpectator = () => {
        return true
    }

    const getPlayerCards = () => {
        return playerList.map(player => {
            return <Profile
                imgURL={'src/assets/accuser.png'}
                isSpectator={isPlayerSpectator()}
                key={playerList.indexOf(player)}>
            </Profile>
        })

    }

    const containerStyle = {
        position: 'absolute',
        top:'14vh',
        right:'15vw',
        bottom:'20vh',
        // backgroundColor: 'rgba(50, 50, 50, 1)',
        // border: 'solid',
        borderColor: 'rgba(20,20,20,1)',
        borderRadius: '10px',
        padding: '5px',
        // maxHeight: `calc(100vh - 30vh)`,
        overflow: 'hidden',
        maxWidth:'128px'
    };

    const scrollableWithoutBar = {
        maxHeight: '100%',  // Adjust this value based on your needs
        overflowY: 'auto',
        scrollbarWidth: 'none',  /* Firefox */
        msOverflowStyle: 'none',  /* Internet Explorer 10+ */
    }

    return <>
        <div style={containerStyle}>
            <ListGroup
                style={scrollableWithoutBar}
                children={getPlayerCards()}
            />
        </div>
    </>
}

export default ActivePlayers
