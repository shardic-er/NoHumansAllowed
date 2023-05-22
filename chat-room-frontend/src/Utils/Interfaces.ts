interface AppUser {
    user_id:number,
    username:string,
    password:string,
    email:string,
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
    imgURL?: string;
    isSpectator: boolean;
    key:number;
    stats: Stats;
    username: string;
    parentComponent?: string;
}

interface Room {
    name:string,
    users: AppUser[],
    messages: ChatPost[]
}

export type {AppUser, Stats, ChatPost, ProfileProps, MusicProps, Room}