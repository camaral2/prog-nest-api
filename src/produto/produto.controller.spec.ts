import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoController } from './produto.controller';

describe('ProdutoController', () => {
  let controller: ProdutoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutoController],
    }).compile();

    controller = module.get<ProdutoController>(ProdutoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  /*it('Should get all produtos', () => {
    expect(controller.getProdutos()).toBe('My Hello World! - Two!!');
  });*/
});
