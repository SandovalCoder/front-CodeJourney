// services/commentService.ts
import { Comment } from "../types/comment";
import axios from "axios";

const API_URL = "http://localhost:5000/api/comments";

// Obtiene todos los comentarios (si la API así lo permite)
export const getComments = async (): Promise<Comment[] | null> => {
    try {
        const response = await axios.get(API_URL);
        // Se asume que la respuesta es de la forma: { comments: Comment[] }
        return response.data.comments;
    } catch (error) {
        console.error("Error fetching comments:", error);
        return null;
    }
};

// Crea un comentario para un post (requiere token)
// Se envía a la ruta: POST /api/comments/create/:postId
export const createComment = async (
    token: string,
    postId: string,
    comment: Partial<Comment>
): Promise<Comment | null> => {
    try {
        const response = await axios.post(
            `${API_URL}/create/${postId}`,
            { content: comment.content },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            }
        );
        return response.data.newComment;
    } catch (error) {
        console.error("Error creating comment:", error);
        return null;
    }
};

// Obtiene todos los comentarios de un post específico
// Se envía a la ruta: GET /api/comments/post/:postId
export const getCommentsByPostId = async (
    postId: string
): Promise<Comment[] | null> => {
    try {
        const response = await axios.get(`${API_URL}/post/${postId}`);
        // Se asume que la respuesta tiene la forma: { comments: Comment[] }
        return response.data.comments;
    } catch (error) {
        console.error("Error fetching comments by postId:", error);
        return null;
    }
};

// Obtiene un comentario específico por su ID
// Se envía a la ruta: GET /api/comments/:commentId
export const getComment = async (
    commentId: string
): Promise<Comment | null> => {
    try {
        const response = await axios.get(`${API_URL}/${commentId}`);
        return response.data as Comment;
    } catch (error) {
        console.error("Error fetching comment:", error);
        return null;
    }
};

// Actualiza un comentario (requiere token)
// Se envía a la ruta: PUT /api/comments/:commentId
export const updateComment = async (
    token: string,
    commentId: string,
    comment: Partial<Comment>
): Promise<Comment | null> => {
    try {
        const response = await axios.put(`${API_URL}/${commentId}`, comment, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data as Comment;
    } catch (error) {
        console.error("Error updating comment:", error);
        return null;
    }
};

// Elimina un comentario (requiere token)
// Se envía a la ruta: DELETE /api/comments/:commentId
export const deleteComment = async (
    token: string,
    commentId: string
): Promise<boolean> => {
    try {
        await axios.delete(`${API_URL}/${commentId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return true;
    } catch (error) {
        console.error("Error deleting comment:", error);
        return false;
    }
};
