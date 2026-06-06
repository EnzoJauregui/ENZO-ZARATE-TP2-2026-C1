import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Comentario {
    
    @Prop({ required: true })
    email_autor: string;
    
    @Prop({ required: true })
    contenido: string;
    
    @Prop({ required: true })
    fecha_creacion: string;
    
    @Prop()
    fue_editado: boolean

    @Prop()
    fecha_baja?: string;
}

export const ComentarioSchema = SchemaFactory.createForClass(Comentario);