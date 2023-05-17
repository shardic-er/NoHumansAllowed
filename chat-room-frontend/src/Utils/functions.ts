import {AppUser} from "./Interfaces";
import {accountServiceLogin, accountServiceRegister} from "./config";

export async function login(credentials): Promise<AppUser | void> {

    return await fetch(accountServiceLogin, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
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
