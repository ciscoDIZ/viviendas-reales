export interface GetUser {
    id: string;
    name: string;
    surname: string;
    email: string;
    role: string;
    createdAt: Date;
    activated: boolean;
}
