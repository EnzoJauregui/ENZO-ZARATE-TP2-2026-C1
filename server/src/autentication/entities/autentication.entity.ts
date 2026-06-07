import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Autentication {
    @Prop({ required: true })
    nombre: string;
  
    @Prop({ required: true })
    apellido: string;
  
    @Prop({ required: true, unique: true })
    email: string;
  
    @Prop({ required: true })
    password: string;
  
    @Prop({ required: true })
    username: string;
  
    @Prop({ required: true })
    descripcion: string;
  
    @Prop({ required: true })
    perfil: string;
  
    @Prop({ required: true })
    fecha_nacimiento: string;
  
    @Prop() 
    imagen_url: string;

    @Prop()
    fecha_baja?: string;
}

export const AutenticationSchema = SchemaFactory.createForClass(Autentication);
