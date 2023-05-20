import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import UserInfo from '../UserInfo/UserInfo';
import {AppUser} from "../../Utils/Interfaces";
import React from "react";
import {Socket} from "socket.io-client";
import RoomDebug from "../RoomDebug/RoomDebug";

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

    const {user, setAppUser, socket, setSocket, muted, setMuted} = props;

    const logout = () => {
        setAppUser(undefined)
        setSocket(undefined)
    }

    const onToggleMute = () => {
        setMuted(!muted)
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
                            onClick={logout}>
                            R E M O V E H U M A N
                        </NavDropdown.Item>
                    </NavDropdown>

                </Nav>
            </Container>
        </Navbar>
    );
}

export default InfoHeader;