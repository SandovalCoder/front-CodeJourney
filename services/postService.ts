// services/postService.ts
import { Post } from "../types/posts";
import axios from "axios";

//const API_URL = "http://localhost:5000/api/posts"; // Asegúrate de que sea la URL correcta
const API_URL = "https://back-code-journey.vercel.app/api/posts"; //para el deploy

// Obtiene todos los posts junto con sus comentarios
export const getPosts = async (): Promise<Post[] | null> => {
    try {
        const response = await axios.get(API_URL);
        // Se asume que la respuesta tiene la forma: { posts: Post[] }
        return response.data.posts;
    } catch (error) {
        console.error("Error fetching posts:", error);
        return null;
    }
};

// Obtiene un post en específico junto con sus comentarios
export const getPost = async (postId: string): Promise<Post | null> => {
    try {
        const response = await axios.get(`${API_URL}/${postId}`);
        return response.data.post;
    } catch (error) {
        console.error("Error fetching post:", error);
        return null;
    }
};

//Obtener sus posts de un usuario autenticado publicados
export const getPostsByUser = async (token: string): Promise<Post[] | null> => {
    try {
        const response = await axios.get(`${API_URL}/user/posts`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // Se asume que la respuesta es { posts: Post[] }
        return response.data.posts as Post[];
    } catch (error) {
        console.error("Error fetching posts by user:", error);
        return null;
    }
};


// Crea un nuevo post (requiere token)
// Se usa la ruta /create según lo definido en el backend.
export const createPost = async (token: string, post: Partial<Post>): Promise<Post | null> => {
    try {
        const response = await axios.post(`${API_URL}/create`, post, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data as Post;
    } catch (error) {
        console.error("Error creating post:", error);
        return null;
    }
};

// Actualiza un post (requiere token)
export const updatePost = async (token: string, post: Partial<Post>): Promise<Post | null> => {
    if (!post._id || !token) throw new Error("Se requiere ID del post y token");

    try {
        const { data } = await axios.put(
            `${API_URL}/${post._id}`,
            { title: post.title, content: post.content, image: post.image },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        
        return data.updatedPost;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 403) {
            throw new Error("No tienes permiso para editar este post");
        }
        throw error;
    }
};

// Elimina un post (requiere token)
export const deletePost = async (token: string, postId: string): Promise<boolean> => {
    try {
        await axios.delete(`${API_URL}/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return true;
    } catch (error) {
        console.error("Error deleting post:", error);
        return false;
    }
};
