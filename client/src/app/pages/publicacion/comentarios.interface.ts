export interface IComentarioParcial{
    email_autor: string;
    id_autor: string
    id_publicacion: string
    contenido: string;
    fecha_creacion: string;
    fue_editado: boolean
    dado_de_baja?: boolean;
}