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

    @Prop({ required: true })
    fecha_publicacion: string;

    @Prop()
    imagen_url?: string;

    @Prop()
    fecha_baja?: string;
}

export const PublicacionesSchema = SchemaFactory.createForClass(Publicaciones);
