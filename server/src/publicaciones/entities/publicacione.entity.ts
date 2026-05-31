import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Publicaciones {
    @Prop({ required: true })
    titulo!: string;

    @Prop({ required: true })
    contenido!: string;

    @Prop({ required: true })
    autor!: string;

    @Prop({ required: true })
    nombre_autor!: string;

    @Prop({ required: true })
    likes!: number;

    @Prop({ required: true })
    fecha_publicacion!: string;

    @Prop()
    imagen_Url?: string;
}

export const PublicacionesSchema = SchemaFactory.createForClass(Publicaciones);
