import { Test, TestingModule } from '@nestjs/testing';
import { AppLibraryService } from './app-library.service';

describe('AppLibraryService', () => {
  let service: AppLibraryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppLibraryService],
    }).compile();

    service = module.get<AppLibraryService>(AppLibraryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
