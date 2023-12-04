import React, {useEffect} from "react";
import {AppUser} from "../../Utils/Interfaces";
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
import {useAuth0} from '@auth0/auth0-react';
import LoginButton from "./LoginButton";
import {REACT_APP_API_ENDPOINT} from "../../../config";

function LoginComponent(
    {
        appUser,
        setAppUser,
        musicPlayOnClick
    }: {
        appUser: AppUser | undefined,
        setAppUser: React.Dispatch<React.SetStateAction<AppUser | undefined>>,
        musicPlayOnClick: () => void
    }
) {

    const { isAuthenticated, user, isLoading, getAccessTokenSilently } = useAuth0();

    useEffect(() => {
            if (isAuthenticated && user) {
                getAccessTokenSilently().then(async accessToken => {
                    // Define the API endpoint
                    const apiEndpoint = REACT_APP_API_ENDPOINT;

                    // add additional claims
                    const payload = {
                        nickname: user.nickname,
                        email: user.email
                    };

                    // Prepare the request options
                    const requestOptions = {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    };

                    // Send the request to your backend
                    fetch(apiEndpoint, requestOptions)
                        .then(response => response.json())
                        .then(data => {
                            console.log("AppUser data from backend:", data);
                            setAppUser(data); // Set the AppUser state
                        })
                        .catch(error => {
                            console.error("Error fetching data: ", error);
                            setAppUser(undefined);
                        });
                })
            } else {
                setAppUser(undefined);
            }
        },
        [isAuthenticated, user, setAppUser]
    )

    const getRandomTitleCard = () => {
        const titleCards = [titleCard1, titleCard2,
            titleCard3, titleCard4, titleCard5, titleCard6,
            titleCard7, titleCard8, titleCard9, titleCard10,
            titleCard11, titleCard12, titleCard13, titleCard14,
        ]

        const index = Math.floor(Math.random() * titleCards.length);
        return titleCards[index];
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    // only render if isVisible is true.
    return (appUser === undefined) ?
        <>
            {/*Oauth tutorial elements, the new working login and logout button*/}
            {/*logs in using O-Auth's loginWithRedirect()*/}
            <div className={'imageContainer'}>
                <img src={getRandomTitleCard()} alt={'background'}/>
                <img src={titleText} alt={'background'} className={'element-on-top title'}/>
                <div className={'element-on-top'}>
                    <LoginButton/>
                </div>
            </div>
        </> :
        <></>
}

export default LoginComponent;