import { Document } from 'mongoose';
export interface IProduto extends Document {
  readonly description: string;
  readonly price: number;
  readonly width?: number;
  readonly message?: string;
}
