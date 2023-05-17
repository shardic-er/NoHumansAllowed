import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {ChangeEvent, useState} from "react";

function LoginComponent() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleClick = () => {
        // some api req handle response
        setUsername('')
        setPassword('')
    }

    const handleUsernameChange = (event:ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event:ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }


    return <>
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



    </>

}

export default LoginComponent;