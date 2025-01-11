import { Test, TestingModule } from '@nestjs/testing';
import { DocumentArticleController } from './document-article.controller';

describe('DocumentArticleController', () => {
  let controller: DocumentArticleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentArticleController],
    }).compile();

    controller = module.get<DocumentArticleController>(
      DocumentArticleController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
