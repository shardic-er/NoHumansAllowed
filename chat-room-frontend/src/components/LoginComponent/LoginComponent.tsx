import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, {ChangeEvent, useState} from "react";
import {AppUser} from "../../Utils/Interfaces";
import {login, register} from "../../Utils/functions";
import titleCard1 from '/src/assets/NoHumansAllowed.png'
import titleCard2 from '/src/assets/accuser.png'
import titleCard3 from '/src/assets/curiosity.png'
import titleCard4 from '/src/assets/bazzmoz.png'
import titleCard5 from '/src/assets/eureka.png'
import titleCard6 from '/src/assets/detective.png'
import titleCard7 from '/src/assets/minusone.png'
import titleCard8 from '/src/assets/robohno.png'
import titleCard9 from '/src/assets/sadgears.png'
import titleCard10 from '/src/assets/sargentbolts.png'
import titleCard11 from '/src/assets/scarytron.png'
import titleCard12 from '/src/assets/sonny.png'
import titleCard13 from '/src/assets/wattee.png'
import titleCard14 from '/src/assets/boxart.png'
import titleText from '/src/assets/NoHumansAllowedText.png'

import './LoginComponent.css'

function LoginComponent({appUser, setAppUser}: { appUser:AppUser|undefined, setAppUser:React.Dispatch<React.SetStateAction<AppUser|undefined>>}) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordAgain, setPasswordAgain] = useState('')
    const [email, setEmail] = useState('')

    const [mode, setMode] = useState('login')

    const getRandomTitleCard = () => {
        const titleCards = [titleCard1, titleCard2,
            titleCard3, titleCard4, titleCard5, titleCard6,
            titleCard7, titleCard8, titleCard9, titleCard10,
            titleCard11, titleCard12, titleCard13, titleCard14,
        ]

        const index = Math.floor(Math.random() * titleCards.length);
        return titleCards[index];
    }

    // uses the input credentials to attempt login, endpoint returns either appUser or undefined.
    const handleClickLogin = () => {
        if(mode=='login'){

            login({username:username, password:password})
                .then((user:AppUser|void) => {
                    if(user){
                        setAppUser(user)
                    }})

            resetFields()
        }

        else if (mode=='register'){
            resetFields()
            setMode('login')
        }
    }

    // uses the input credentials to attempt registration, endpoint returns appUser object for newlyCreatedUser, or undefined (unable to create)
    const handleClickRegister = () => {

        if(mode=='register'){

            const skipValidation = true

            const newUser:AppUser = {
                user_id:0,
                username: username,
                password: password,
                email: email,
                stats: {
                    gamesPlayed:0,
                    gamesWon:0,
                    gamesSurvived:0,
                    gamesAbandoned:0
                }
            }

            const usernameIsValid = ():boolean => {
                return username.length >= 6
            }

            const emailIsValid = ():boolean => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            }

            const passwordIsValid = ():boolean => {
                return (password == passwordAgain)
            }

            const userIsValid = ():boolean => {
                for(const value of Object.values(newUser)){
                    if(!value){
                        return false
                    }
                }
                return true
            }

            if(skipValidation || (emailIsValid() && passwordIsValid() && userIsValid() && usernameIsValid())){
                register(newUser).then((user:AppUser|void) => {
                    if(user){
                        setAppUser(user)
                    }
                })
                resetFields()
            } else {
                if(!usernameIsValid()) {alert('username must be 6 characters or longer')}
                if(!emailIsValid()) {alert('email is not valid')}
                if(!passwordIsValid()) {alert('passwords must match.')}
                if(!userIsValid()) {alert('all fields must be filled')}
            }
        }

        else if (mode=='login'){
            resetFields()
            setMode('register')
        }

    }

    const onSubmit = () => {
        return (mode==='login') ? handleClickLogin() : handleClickRegister()
    }

    const resetFields = () => {
        setUsername('')
        setPassword('')
        setPasswordAgain('')
        setEmail('')
    }

    const handleUsernameChange = (event:ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event:ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handlePasswordAgainChange = (event:ChangeEvent<HTMLInputElement>) => {
        setPasswordAgain(event.target.value)
    }

    const handleEmailChange = (event:ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            onSubmit();
        }
    };

    // only render if isVisible is true.
    return (appUser === undefined) ?
        <>
            <div className={'imageContainer'}>
                <img src={getRandomTitleCard()} alt={'background'}/>
                <img src={titleText} alt={'background'} className={'element-on-top title'}/>
                <div className={'element-on-top'}>
                    {(mode == 'login') ?
                        <Form
                            style={{display: 'block', margin: 'auto', width: 'auto'}}>
                            <Form.Control
                                placeholder={'Username'}
                                value={username}
                                onChange={handleUsernameChange}
                                onKeyDown={handleKeyDown}
                            />
                            <br/>
                            <Form.Control
                                placeholder={'Password'}
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                onKeyDown={handleKeyDown}
                            />
                        </Form>
                        : <></>}

                    {(mode=='register') ?
                        <Form
                            style={{display: 'block', margin:'auto', width:'auto'}}>
                            <Form.Control
                                placeholder={'Choose a username'}
                                value={username}
                                onChange={handleUsernameChange}
                            />
                            <br/>
                            <Form.Control
                                placeholder={'Choose a password'}
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                            />

                            <br/>
                            <Form.Control
                                placeholder={'Confirm password'}
                                type="password"
                                value={passwordAgain}
                                onChange={handlePasswordAgainChange}
                            />

                            <br/>
                            <Form.Control
                                placeholder={'Email address'}
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                            />

                        </Form>
                        : <></>
                    }

                    {/*Buttons*/}
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
            </div>
        </> :
        <></>
}

export default LoginComponent;