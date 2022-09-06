import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoController } from './produto.controller';
import { ProdutoService } from './produto.service';
import { ProdutoModule } from './produto.module';

describe('ProdutoController', () => {
  let produtoController: ProdutoController;
  let service: ProdutoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutoController],
      providers: [ProdutoService],
      imports: [ProdutoModule],
    }).compile();

    produtoController = module.get<ProdutoController>(ProdutoController);
    service = module.get<ProdutoService>(ProdutoService);
  });

  it('should be defined', () => {
    expect(produtoController).toBeDefined();
  });

  /*
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
  it('Should add new produto', async () => {
    const newProd = {
      description: 'key',
      price: 4.59,
      width: 340,
      message: 'test',
    };
    const ret = await produtoController.addProduto('produto', newProd);
    expect(ret).toMatchObject(newProd);
  });
*/
});
