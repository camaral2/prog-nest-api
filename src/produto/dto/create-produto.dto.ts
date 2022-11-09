import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsCurrency,
  IsNotEmpty,
  MaxLength,
  Min,
  MinLength,
  NotEquals,
} from 'class-validator';

export class CreateProdutoDTO {
  @IsNotEmpty()
  @MinLength(5, { message: 'The min length of description is 5' })
  @MaxLength(50, {
    message: "The description can't accept more than 50 characters",
  })
  @ApiProperty({ example: 'Mouse', description: 'Needed description' })
  readonly description: string;

  @NotEquals(0)
  @Min(0, { message: 'The price need of value' })
  @ApiProperty({ example: 6.34, description: 'Needed price' })
  readonly price: number;

  @ApiPropertyOptional({
    example: 300,
    description: 'Optional width of the Produto',
  })
  readonly width?: number;
  readonly message?: string;
}
