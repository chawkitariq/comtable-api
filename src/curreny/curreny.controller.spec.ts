import { Test, TestingModule } from '@nestjs/testing';
import { CurrenyController } from './curreny.controller';
import { CurrenyService } from './curreny.service';

describe('CurrenyController', () => {
  let controller: CurrenyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrenyController],
      providers: [CurrenyService],
    }).compile();

    controller = module.get<CurrenyController>(CurrenyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
