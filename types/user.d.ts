export interface User {
    _id?: string;
    name: string;
    lastName: string;
    email: string;
    password?: string;
    role?: "user";
}