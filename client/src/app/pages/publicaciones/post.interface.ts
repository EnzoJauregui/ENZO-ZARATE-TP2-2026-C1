export interface IPost {
  titulo: string;
  contenido: string;
  likes: number;
  likes_usuarios: string[];
  imagen_url?: string;
  email_autor: string;
  fecha_publicacion: string;
  fecha_baja: boolean;
}