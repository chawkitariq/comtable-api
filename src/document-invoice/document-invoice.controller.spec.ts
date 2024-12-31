import { Test, TestingModule } from '@nestjs/testing';
import { DocumentInvoiceController } from './document-invoice.controller';

describe('DocumentInvoiceController', () => {
  let controller: DocumentInvoiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentInvoiceController],
    }).compile();

    controller = module.get<DocumentInvoiceController>(
      DocumentInvoiceController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
