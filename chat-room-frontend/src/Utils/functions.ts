import {AppUser} from "./Interfaces";
import {accountServiceRegister} from "./config";

export function login(url:string):AppUser {

    fetch('http://localhost:8080/api/data')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error:', response.status);
            }
        })
        .then(data => {
            console.log('Response data:', data);
        })
        .catch(error => {
            console.log('Error:', error);
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
