import { Test, TestingModule } from '@nestjs/testing';
import { DocumentArticleService } from './document-article.service';

describe('DocumentArticleService', () => {
  let service: DocumentArticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentArticleService],
    }).compile();

    service = module.get<DocumentArticleService>(DocumentArticleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
