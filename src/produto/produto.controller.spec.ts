import { Test } from '@nestjs/testing';
import { ProdutoController } from '@exmpl/produto/produto.controller';
import { ProdutoService } from '@exmpl/produto/produto.service';
import { IProduto } from '@exmpl/produto/interfaces/produto.interfaces';
import { Produto } from '@exmpl/produto/schemas/produto.schema';
import { CreateProdutoDTO } from '@exmpl/produto/dto/create-produto.dto';
import { ProdutoAlreadyExists } from '@exmpl/produto/exception/produto-already-exists';
import { ProdutoNotFound } from '@exmpl/produto/exception/produto-not-found';

const produtoMock = {
  description: 'Display',
  price: 8.9,
};

describe('ProdutoController', () => {
  let controller: ProdutoController;
  let service: ProdutoService;
  //let res: Partial<Response>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ProdutoController],
      providers: [
        ProdutoService,
        {
          provide: ProdutoService,
          useValue: {
            getProdutos: jest.fn(() => [produtoMock]),
            addProduto: jest.fn().mockResolvedValue(produtoMock),
            getProduto: jest.fn(),
          },
        },
      ],
    }).compile();

    //res = jest.fn(() => {
    //  status: jest.fn().mockReturnThis();
    //});

    service = moduleRef.get<ProdutoService>(ProdutoService);
    controller = moduleRef.get<ProdutoController>(ProdutoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a list of produtos', async () => {
    const prods: Produto[] = [];
    const p1: Produto = { description: 'Mouse', price: 2.98 };
    const p2: Produto = { description: 'Paper', price: 4.2 };
    prods.push(p1);
    prods.push(p2);

    //const mockResponse = {
    //  json: jest.fn().mockResolvedValue(prods),
    //  status: jest.fn().mockReturnThis(),
    //};

    //jest
    //  .spyOn(service, 'getProdutos')
    //  .mockResolvedValue(() => Promise.resolve(prods as IProduto[]));

    jest.spyOn(service, 'getProdutos').mockResolvedValue(prods as IProduto[]);

    const findAllResult = await controller.getProdutos();

    expect(service.getProdutos).toHaveBeenCalled();
    expect(findAllResult).toBe(prods);
  });

  /*
  it('Should get all produtos', () => {
    controller.getProdutos(Res).then((data) => {
      expect(data.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('Should get produto 1', () => {
    expect(produtoController.getProduto({ id: 1 })).toMatchObject({
      description: 'Mouse',
      id: 1,
    });
  });
*/
  describe('Post produto', () => {
    it('Should add new produto', async () => {
      /*
      const newProd: CreateProdutoDTO = {
        description: 'key',
        price: 4.59,
        width: 340,
        message: 'test',
      };
      jest.spyOn(service, 'addProduto').mockResolvedValue(newProd as IProduto);
      */

      const ret = await controller.addProduto(produtoMock);

      expect(service.addProduto).toHaveBeenCalled();
      expect(ret).toMatchObject(produtoMock);
    });

    it('calling addProduto method', () => {
      const dto = new CreateProdutoDTO();
      controller.addProduto(dto);
      expect(service.addProduto).toHaveBeenCalled();
      expect(service.addProduto).toHaveBeenCalledWith(dto);
    });

    it('Should return produto-already-exists exception', async () => {
      jest.spyOn(service, 'addProduto').mockImplementation(() => {
        throw new ProdutoAlreadyExists();
      });

      try {
        await controller.addProduto(produtoMock);
      } catch (e) {
        expect(e).toBeInstanceOf(ProdutoAlreadyExists);
      }
    });
  });

  describe('Get Produto', () => {
    it('Should return a produto after get', async () => {
      jest
        .spyOn(service, 'getProduto')
        .mockResolvedValueOnce(produtoMock as IProduto);

      const ret = await controller.getProduto(produtoMock.description);

      expect(service.getProduto).toHaveBeenCalled();
      expect(ret).toMatchObject(produtoMock);
    });

    it('should return error, if there is no produto with given description', async () => {
      jest.spyOn(service, 'getProduto').mockImplementation(() => {
        throw new ProdutoNotFound();
      });

      try {
        await controller.getProduto('');
      } catch (e) {
        expect(e).toBeInstanceOf(ProdutoNotFound);
      }
    });
  });
});
