import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, {ChangeEvent, useState} from "react";
import {AppUser} from "../../Utils/Interfaces";

// pretend that the response from Auth server looks like this.
const exampleUser: AppUser = {
    username:'login',
    password:'pass',
    stats:{
        gamesPlayed:0,
        gamesWon:0,
        gamesSurvived:0,
        gamesAbandoned:0,
    }
}

function LoginComponent({appUser, setAppUser}: { appUser:AppUser|undefined, setAppUser:React.Dispatch<any>}) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleClick = () => {
        // some api req handle response
        // const response = fetch(api.url)
        // const exampleUser = response.UserObjectFromAuthDatabase
        setAppUser(exampleUser)

        // Clear the username and password fields.
        setUsername('')
        setPassword('')
    }

    const handleUsernameChange = (event:ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event:ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const isVisible = () => {
        // Returns false if the user is undefined (not logged in)
        return !appUser
    }

    // only render if isVisible is true.
    return isVisible() ?
        <>
            <Form
                style={{display: 'block', margin:'auto', width:'auto'}}>
                <Form.Control
                    id="inputUsername"
                    placeholder={'Username'}
                    value={username}
                    onChange={handleUsernameChange}
                />
                <br/>
                <Form.Control
                    placeholder={'Password'}
                    type="password"
                    id="inputPassword"
                    aria-describedby="passwordHelpBlock"
                    value={password}
                    onChange={handlePasswordChange}
                />

                <Button
                    style={{display: 'block', margin:'auto', width:'auto'}}
                    variant="dark"
                    children={'Login'}
                    onClick={handleClick}
                />
            </Form>
        </> :
        <></>
}

export default LoginComponent;