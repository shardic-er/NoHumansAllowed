import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import UserInfo from '../UserInfo/UserInfo';
import {AppUser} from "../../Utils/Interfaces";
import React, { useState } from "react";
import {Socket} from "socket.io-client";
import RoomDebug from "../RoomDebug/RoomDebug";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ImageSelector from '../ImageSelector/ImageSelector';
import { useAuth0 } from "@auth0/auth0-react";


// ¿This component needs the webtoken for who is logged in?
// It also needs the user object to pass to the UserInfo card
// Count/setcount are examples of how to change the variable

function InfoHeader(props: {
    user: AppUser|undefined,
    setAppUser: React.Dispatch<React.SetStateAction<AppUser|undefined>>,
    socket:Socket|undefined
    setSocket: React.Dispatch<React.SetStateAction<Socket|undefined>>,
    muted:boolean,
    setMuted:React.Dispatch<React.SetStateAction<boolean>>
}) {

    const { logout } = useAuth0();
    const {user, setAppUser, socket, setSocket, muted, setMuted} = props;

    const handleLogout = () => {
        setAppUser(undefined)
        setSocket(undefined)
        logout({ logoutParams: { returnTo: window.location.origin } })
    }

    const onToggleMute = () => {
        setMuted(!muted)
    }

    const [show, setShow] = useState(false);
      
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const roboSettingsIcon = () => { return (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="grey"
            className="bi bi-robot-gear" viewBox="-4 -2 20 18">
            <g transform="translate(-2.5,-1.5)">
                <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a24.767 24.767 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25.286 25.286 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135Z"/>
                <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866ZM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5Z"/>
                <circle cx="14.5" cy="13.5" r="4" fill="#121212" />
            </g>
            <g transform="translate(-0.4,0.6)">
                <path d="M11.886 8.46c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382l.045-.148Z"/>
                <circle cx="12.5" cy="11.5" r="1.5" fill="#121212" />
            </g>
        </svg>
        )
    }   


    return (
        <Navbar style={{backgroundColor: '#121212', margin: '0', padding: '0'}} expand="lg" variant="dark" fixed="top">
            <Container style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '70%'}}>
                {(user !== undefined) ?
                    <UserInfo user={user}/> :
                    <></>
                }
                {/* <Navbar.Brand href="#navToUserSettingsPage">No Humans Allowed</Navbar.Brand> */}
                <Nav>
                    <Button onClick={handleShow} style={{backgroundColor: '#121212', border: '2px solid grey', borderRadius: '1rem'}}>
                        {roboSettingsIcon()}
                    </Button>
                    <Offcanvas show={show} onHide={handleClose} style={{backgroundColor: "#444444", borderRight: "2rem solid #222222"}}>
                        <Offcanvas.Header closeButton>
                        <Offcanvas.Title>CHOOSE DISGUISE</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <ImageSelector />
                        </Offcanvas.Body>
                    </Offcanvas>
                    <RoomDebug socket={socket}/>
                    <NavDropdown title="">
                        <NavDropdown.Item onClick={onToggleMute} >
                            {(muted)?
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                                     className="bi bi-volume-mute-fill" viewBox="0 0 16 16"
                                     style={{width:'100%', margin:'auto'}}>
                                    <path
                                        d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zm7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z"/>
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                                     className="bi bi-volume-up-fill" viewBox="0 0 16 16"
                                     style={{width:'100%', margin:'auto'}}>
                                    <path
                                        d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
                                    <path
                                        d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/>
                                    <path
                                        d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/>
                                </svg>
                            }
                        </NavDropdown.Item>
                        <NavDropdown.Item
                            style={{color:'red', fontWeight:'bold'}}
                            onClick={handleLogout}>
                            R E M O V E H U M A N
                        </NavDropdown.Item>
                    </NavDropdown>

                </Nav>
            </Container>
        </Navbar>
    );
}

export default InfoHeader;