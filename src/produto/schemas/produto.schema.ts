import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ValidateIf } from 'class-validator';
import { Document } from 'mongoose';

export type ProdutoDocument = Produto & Document;

@Schema()
export class Produto {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  @ValidateIf((o) => o.price > 0, {
    message: 'price need to be > 0',
  })
  price: number;

  @Prop()
  width?: number;

  @Prop()
  message?: string;
}

//message: 'price need to be > 0',
export const ProdutoSchema = SchemaFactory.createForClass(Produto);
