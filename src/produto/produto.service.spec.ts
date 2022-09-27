import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoService } from './produto.service';
//import { Produto, ProdutoSchema } from './schemas/produto.schema';
//import { ProdutoModule } from './produto.module';
import { Model } from 'mongoose';
import { IProduto } from './interfaces/produto.interfaces';
import { getModelToken } from '@nestjs/mongoose';

const mappingModel = {
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
};

describe('ProdutoService', () => {
  let service: ProdutoService;
  let model: typeof mappingModel;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        ProdutoService,
        {
          provide: getModelToken('Produto'),
          useValue: mappingModel,
        },
      ],
    }).compile();

    service = app.get<ProdutoService>(ProdutoService);
    model = app.get(getModelToken('Produto'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(model).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const produtosMock = [
        {
          description: 'Mouse',
          price: 2.98,
        },
        {
          description: 'Keyboard',
          price: 4.14,
        },
      ];

      model.find.mockResolvedValue(produtosMock);
      const res = await service.getProdutos();

      expect(res).toMatchObject(produtosMock);
      expect(model.find).toHaveBeenCalledTimes(1);

      expect(res.length).toBe(2);
      expect(model.find).toHaveBeenCalled();
    });
  });
});
