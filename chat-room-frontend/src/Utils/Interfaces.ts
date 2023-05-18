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

interface chatPost {
    username:string,
    message:string,
}

export {AppUser, Stats, chatPost}