import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoService } from './produto.service';

describe('ProdutoService', () => {
  let service: ProdutoService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ProdutoService,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = app.get(ProdutoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
