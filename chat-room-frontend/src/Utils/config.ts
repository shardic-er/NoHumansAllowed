import {AppUser} from "./Interfaces";

export const accountServiceLogin = 'http://localhost:8080/users/login'

//rename register
export const accountServiceRegister = 'http://localhost:8080/users/create'

export const accountServiceUpdate = (user:AppUser):string => {
    return `http://localhost:8080/stats/${user.username}`
}

export const getGameServerURL = ():string => {
    return `http://localhost:8081/`
}