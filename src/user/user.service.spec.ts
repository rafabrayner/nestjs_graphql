import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { User } from './user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn((user: Partial<User>) => new User(user)),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('userRepository should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('createUser', () => {
    it('should call userRepository.create with correct params', async () => {
      jest.spyOn(userRepository, 'save').mockReturnValueOnce(
        Promise.resolve({
          id: 1,
          name: 'John',
          email: 'john@email.com',
        }),
      );
      await userService.createUser({
        name: 'John',
        email: 'john@email.com',
      });
      expect(userRepository.create).toHaveBeenCalledWith({
        name: 'John',
        email: 'john@email.com',
      });
    });

    it('should call userRepository.save with correct params', async () => {
      jest.spyOn(userRepository, 'save').mockReturnValueOnce(
        Promise.resolve({
          id: 1,
          name: 'John',
          email: 'john@email.com',
        }),
      );
      await userService.createUser({
        name: 'John',
        email: 'john@email.com',
      });
      expect(userRepository.save).toHaveBeenCalledWith({
        name: 'John',
        email: 'john@email.com',
      });
    });

    it('should throw InternalServerErrorException if the savedUser is null', async () => {
      jest
        .spyOn(userRepository, 'save')
        .mockReturnValueOnce(Promise.resolve(null));

      await expect(
        userService.createUser({
          name: 'John',
          email: 'john@email.com',
        }),
      ).rejects.toThrowError(InternalServerErrorException);
    });
  });

  describe('findAllUsers', () => {
    // TODO
  });

  describe('findUsersByName', () => {
    // TODO
  });
});
