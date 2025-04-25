import { Test, TestingModule } from '@nestjs/testing';
import { AppLibraryController } from './app-library.controller';

describe('AppLibraryController', () => {
  let controller: AppLibraryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppLibraryController],
    }).compile();

    controller = module.get<AppLibraryController>(AppLibraryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
