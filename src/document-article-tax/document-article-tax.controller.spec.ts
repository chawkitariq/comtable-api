import { Test, TestingModule } from '@nestjs/testing';
import { DocumentArticleTaxController } from './document-article-tax.controller';

describe('DocumentArticleTaxController', () => {
  let controller: DocumentArticleTaxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentArticleTaxController],
    }).compile();

    controller = module.get<DocumentArticleTaxController>(
      DocumentArticleTaxController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
