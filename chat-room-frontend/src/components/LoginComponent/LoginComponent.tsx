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

function LoginComponent({appUser, setAppUser}: { appUser:AppUser|undefined, setAppUser:React.Dispatch<React.SetStateAction<AppUser|undefined>>}) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // uses the input credentials to attempt login, endpoint returns either appUser or undefined.
    const handleClickLogin = () => {
        // some api req handle response
        // const response = fetch(api.url)
        // const exampleUser = response.UserObjectFromAuthDatabase
        setAppUser(exampleUser)

        // Clear the username and password fields.
        setUsername('')
        setPassword('')
    }

    // uses the input credentials to attempt registration, endpoint returns appUser object for newlyCreatedUser, or undefined (unable to create)
    const handleClickRegister = () => {
        // some api request
        setAppUser(exampleUser)
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

                <div>
                    <Button
                        style={{margin:'auto', width:'auto'}}
                        variant="dark"
                        children={'Login'}
                        onClick={handleClickLogin}
                    />
                    <Button
                        style={{margin:'auto', width:'auto'}}
                        variant="dark"
                        children={'Register'}
                        onClick={handleClickRegister}
                    />
                </div>
            </Form>
        </> :
        <></>
}

export default LoginComponent;