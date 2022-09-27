import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateProdutoDTO {
  @IsNotEmpty()
  @MinLength(5, { message: 'The min length of password is 5' })
  @MaxLength(50, {
    message: "The password can't accept more than 50 characters",
  })
  readonly description: string;
  readonly price: number;
  readonly width?: number;
  readonly message?: string;
}
