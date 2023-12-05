import {ProfilePicture} from "./Enums";

interface AppUser {
    oAuthSub:string,
    username:string,
    profilePicture: string,
    stats:Stats
}

interface Stats {
    gamesPlayed:number,
    gamesWon:number,
    gamesSurvived:number,
    gamesAbandoned:number,
}

interface ChatPost {
    room:string
    username:string,
    message:string,
}

interface MusicProps {
    musicSource: string,
    muted:boolean
}

interface ProfileProps {
    stats: Stats;
    username: string;
    profilePic: string;
    isInHeader: boolean | undefined;
}

interface Room {
    name:string,
    users: AppUser[],
    messages: ChatPost[]
}

export type {AppUser, Stats, ChatPost, ProfileProps, MusicProps, Room}