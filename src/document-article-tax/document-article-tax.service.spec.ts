import { Test, TestingModule } from '@nestjs/testing';
import { DocumentArticleTaxService } from './document-article-tax.service';

describe('DocumentArticleTaxService', () => {
  let service: DocumentArticleTaxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentArticleTaxService],
    }).compile();

    service = module.get<DocumentArticleTaxService>(DocumentArticleTaxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
