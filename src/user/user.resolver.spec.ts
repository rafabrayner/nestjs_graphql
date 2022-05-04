import { UserService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';

describe('UserResolver', () => {
  let userResolver: UserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: {
            findAllUsers: jest.fn(),
            findAllUsersByName: jest.fn(),
            createUser: jest.fn(),
          },
        },
      ],
    }).compile();

    userResolver = module.get<UserResolver>(UserResolver);
  });

  it('should be defined', () => {
    expect(userResolver).toBeDefined();
  });

  describe('findAllUsers', () => {
    // TODO
  });

  describe('findUsersByName', () => {
    // TODO
  });
});
