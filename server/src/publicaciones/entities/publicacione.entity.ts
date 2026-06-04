import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Publicaciones {
    @Prop({ required: true })
    titulo: string;

    @Prop({ required: true })
    contenido: string;

    @Prop({ required: true })
    email_autor: string;

    @Prop({ required: true })
    likes: number;

    @Prop({ required:true })
    id_autor: string;

    @Prop({ required: true })
    fecha_publicacion: string;

    @Prop({ type: [String], default: [] })
    likes_usuarios: string[];

    @Prop()
    imagen_url?: string;

    @Prop()
    fecha_baja?: boolean;
}

export const PublicacionesSchema = SchemaFactory.createForClass(Publicaciones);
