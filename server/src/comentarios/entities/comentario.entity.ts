import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Comentario {
    @Prop({ required: true })
    id_publicacion: string;

    @Prop({ required: true })
    id_autor: string;

    @Prop({ required: true })
    email_autor: string;
    
    @Prop({ required: true })
    contenido: string;
    
    @Prop({ required: true })
    fecha_creacion: string;
    
    @Prop()
    fue_editado: boolean

    @Prop()
    dado_de_baja?: boolean;
}

export const ComentarioSchema = SchemaFactory.createForClass(Comentario);