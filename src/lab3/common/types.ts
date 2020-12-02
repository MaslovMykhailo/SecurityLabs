export const enum PlayMode { 
    Lcg = 'Lcg',
    Mt = 'Mt',
    BetterMt = 'BetterMt' 
}

export type Account = {
    id: string;
    money: number;
    deletionTime: Date;
}

export type Bet = {
    message: string;
    account: Account;
    realNumber: number;
}

export type BetParams = {
    accountId: string;
    mode: PlayMode;
    money: number;
    number: number;
}
