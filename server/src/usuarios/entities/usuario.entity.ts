import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Usuario {
  @Prop({ required: true })
  nombre!: string;

  @Prop({ required: true })
  apellido!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ required: true })
  username!: string;

  @Prop({ required: true })
  descripcion!: string;

  @Prop({ required: true })
  perfil!: string;

  @Prop({ required: true })
  fecha_nacimiento!: string;

  @Prop() 
  imagen?: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);