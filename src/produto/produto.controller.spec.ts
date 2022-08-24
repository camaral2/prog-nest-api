import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoController } from './produto.controller';
import { ProdutoService } from './produto.service';

describe('ProdutoController', () => {
  let produtoController: ProdutoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutoController],
      providers: [ProdutoService],
    }).compile();

    produtoController = module.get<ProdutoController>(ProdutoController);
  });

  it('should be defined', () => {
    expect(produtoController).toBeDefined();
  });

  it('Should get all produtos', () => {
    expect(produtoController.getProdutos().length).toBeGreaterThanOrEqual(1);

    //produtoController.getProdutos().then((data) => {
    //  expect(data.length).toBeGreaterThanOrEqual(1);
    //});
  });

  it('Should get produto 1', () => {
    expect(produtoController.getProduto({ id: 1 })).toMatchObject({
      description: 'Mouse',
      id: 1,
    });
  });

  it('Should add new produto', () => {
    const newProd = { id: 3, description: 'key' };

    expect(produtoController.addProduto(newProd)).toMatchObject(newProd);
  });
});
