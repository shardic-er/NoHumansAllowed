import {AppUser} from "./Interfaces";
import {accountServiceLogin, accountServiceRegister, accountServiceVerify} from "./config";

export async function login(credentials): Promise<AppUser | void> {

    // Fetch the JWT token from the login endpoint
    const response = await fetch(accountServiceLogin, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        throw new Error(response.status.toString());
    }
    const jwtToken = await response.text();

    console.log(jwtToken)

    // Call the 'verify' endpoint with the JWT token in the Authorization header
    const verifyResponse = await fetch(accountServiceVerify, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + jwtToken,
        },
    });

    if (!verifyResponse.ok) {
        throw new Error(verifyResponse.status.toString());
    }

    return await verifyResponse.json();

}

export async function register(appUser): Promise<AppUser | void> {
    return await fetch(accountServiceRegister, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(appUser),
    })
        .then((response) => {
            if (response.ok) {
                return response.json() as AppUser;
            } else {
                throw new Error(response.status.toString());
            }
        })
        .then((data) => {
            console.log('Response data:', data);
            return data;
        })
        .catch((error) => {
            console.log('Error:', error);
            throw error;
        });
}

export function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
