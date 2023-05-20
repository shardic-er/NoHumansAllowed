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
    stats: Stats;
    username: string;
    parentComponent?: string;
}

export {AppUser, Stats, ChatPost, ProfileProps, MusicProps}