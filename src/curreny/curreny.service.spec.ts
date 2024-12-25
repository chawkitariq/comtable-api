import { Test, TestingModule } from '@nestjs/testing';
import { CurrenyService } from './curreny.service';

describe('CurrenyService', () => {
  let service: CurrenyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrenyService],
    }).compile();

    service = module.get<CurrenyService>(CurrenyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
