import { Test, TestingModule } from '@nestjs/testing';
import { TaxController } from './tax.controller';
import { TaxService } from './tax.service';

describe('TaxController', () => {
  let controller: TaxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaxController],
      providers: [TaxService],
    }).compile();

    controller = module.get<TaxController>(TaxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
