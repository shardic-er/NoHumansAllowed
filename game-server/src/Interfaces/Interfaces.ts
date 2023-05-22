
export interface AppUser {
    user_id:number,
    username: string,
    password: string,
    email: string,
    stats: Stats
}

export interface Stats {
    stats_id: number,
    gamesPlayed: number,
    gamesWon: number,
    roundsSurvived: number,
    gamesAbandoned: number
}

export interface Room {
    name:string,
    users: AppUser[],
    messages: Message[]
}

export interface Message {
    room:string
    username:string,
    message:string
}