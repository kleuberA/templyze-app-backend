import { Test, TestingModule } from '@nestjs/testing';
import { UserappController } from './userapp.controller';

describe('UserappController', () => {
  let controller: UserappController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserappController],
    }).compile();

    controller = module.get<UserappController>(UserappController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
