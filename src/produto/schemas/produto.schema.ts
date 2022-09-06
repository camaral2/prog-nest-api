import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProdutoDocument = Produto & Document;

@Schema()
export class Produto {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  width: number;

  @Prop()
  message: string;
}

export const ProdutoSchema = SchemaFactory.createForClass(Produto);
