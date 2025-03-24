export interface Comment {
    _id?: string;
    content: string;
    author: string | {
        _id?: string;
        name: string;
        lastName: string;
    };
    post: string;
    createdAt?: string;
}