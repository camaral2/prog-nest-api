import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, Min, MinLength } from 'class-validator';

export class CreateProdutoDTO {
  @IsNotEmpty()
  @MinLength(5, { message: 'The min length of password is 5' })
  @MaxLength(50, {
    message: "The password can't accept more than 50 characters",
  })
  @ApiProperty({ example: 'Mouse', description: 'Needed description' })
  readonly description: string;
  @Min(0, { message: 'The price need of value' })
  readonly price: number;

  @ApiPropertyOptional({
    example: 300,
    description: 'Optional width of the Produto',
  })
  readonly width?: number;
  readonly message?: string;
}
