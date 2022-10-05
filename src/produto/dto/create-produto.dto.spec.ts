import { CreateProdutoDTO } from './create-produto.dto';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

describe('Test of create produto dto', () => {
  it('should throw when the planned description is min length of password is 5.', async () => {
    const dtoInfo: CreateProdutoDTO = { description: 't', price: 10 };
    const ofImportDto = plainToInstance(CreateProdutoDTO, dtoInfo);

    const errors = await validate(ofImportDto);
    expect(errors.length).not.toBe(0);
    expect(JSON.stringify(errors)).toContain('The min length of password is 5');
  });

  it("should throw when the planned description is password can't accept more than 50 characters.", async () => {
    const dtoInfo: CreateProdutoDTO = {
      description: 't'.repeat(51),
      price: 10,
    };
    const ofImportDto = plainToInstance(CreateProdutoDTO, dtoInfo);

    const errors = await validate(ofImportDto);
    expect(errors.length).not.toBe(0);
    expect(JSON.stringify(errors)).toContain(
      "The password can't accept more than 50 characters",
    );
  });

  it('should throw when the planned produto is success.', async () => {
    const dtoInfo: CreateProdutoDTO = {
      description: 'Keyboard',
      price: 7.98,
    };
    const ofImportDto = plainToInstance(CreateProdutoDTO, dtoInfo);

    const errors = await validate(ofImportDto);
    expect(errors.length).toBe(0);
  });

  it('should throw when the planned produto empty of atribute mandatory.', async () => {
    const dtoInfo = {
      produto: 'Keyboard',
      value: 7.98,
    };
    const ofImportDto = plainToInstance(CreateProdutoDTO, dtoInfo);

    const errors = await validate(ofImportDto);
    expect(errors.length).toBe(2);
  });
});
