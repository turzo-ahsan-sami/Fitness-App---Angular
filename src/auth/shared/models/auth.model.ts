export interface User {
    uid: string,
    displayName: string;
    authenticated: boolean,
    email?: string,
    loading?: boolean;
    error?: string;
}

export class User implements User {
    constructor(public uid: string, public displayName: string) {}
}