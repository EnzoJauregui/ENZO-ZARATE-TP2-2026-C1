export interface IComentario{
    email_autor: string;
    id_publicacion: string
    contenido: string;
    fecha_creacion: string;
    fue_editado: boolean
    fecha_baja?: string;
}