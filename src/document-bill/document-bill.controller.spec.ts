import { Test, TestingModule } from '@nestjs/testing';
import { DocumentBillController } from './document-bill.controller';

describe('DocumentBillController', () => {
  let controller: DocumentBillController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentBillController],
    }).compile();

    controller = module.get<DocumentBillController>(DocumentBillController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
