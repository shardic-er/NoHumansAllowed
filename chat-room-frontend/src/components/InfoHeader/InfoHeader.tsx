import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import UserInfo from '../UserInfo/UserInfo';
import {AppUser} from "../../Utils/Interfaces";
import React from "react";
import {Socket} from "socket.io-client";

// ¿This component needs the webtoken for who is logged in?
// It also needs the user object to pass to the UserInfo card
// Count/setcount are examples of how to change the variable

function InfoHeader(props: {
    user: AppUser|undefined,
    setAppUser: React.Dispatch<React.SetStateAction<AppUser|undefined>>,
    setSocket: React.Dispatch<React.SetStateAction<Socket|undefined>>}) {

    const {user, setAppUser, setSocket} = props;

    const logout = () => {
        setAppUser(undefined)
        setSocket(undefined)
    }

    return (
        <Navbar bg="dark" expand="lg" variant="dark" fixed="top">
            <Container style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '70%' }}>
                {(user !== undefined) ?
                    <UserInfo user={user}/> :
                    <></>
                }
                <Navbar.Brand href="#navToUserSettingsPage">No Humans Allowed</Navbar.Brand>
                <Nav>
                    <NavDropdown title="H U M A N" id="basic-nav-dropdown">
                        <NavDropdown.Item>Account</NavDropdown.Item>
                        <NavDropdown.Item>Stats</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item
                            style={{color:'red', fontWeight:'bold'}}
                            onClick={logout}>
                            REMOVE HUMAN
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default InfoHeader;