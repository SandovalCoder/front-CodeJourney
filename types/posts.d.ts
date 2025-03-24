import { Comment } from "./comment";

export interface Post {
    _id?: string;
    image: string;
    title: string;
    content: string;
    author: string | {
        _id?: string;
        name: string;
        lastName: string;
    };
    comments?: Comment[];
    createdAt?: string;
}