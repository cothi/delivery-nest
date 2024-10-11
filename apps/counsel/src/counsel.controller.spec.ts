import { Test, TestingModule } from '@nestjs/testing';
import { CounselController } from './counsel.controller';
import { CounselService } from './counsel.service';

describe('CounselController', () => {
  let counselController: CounselController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CounselController],
      providers: [CounselService],
    }).compile();

    counselController = app.get<CounselController>(CounselController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(counselController.getHello()).toBe('Hello World!');
    });
  });
});
