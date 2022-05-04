import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateUserInput } from './create-user.input';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async findAllUsersByName(name: string): Promise<User[]> {
    const users = this.userRepository.find({
      where: { name: Like(`%${name}%`) },
    });
    return users;
  }

  async createUser(data: CreateUserInput): Promise<User> {
    const user = this.userRepository.create(data);
    const savedUser = await this.userRepository.save(user);

    if (!savedUser) {
      throw new InternalServerErrorException('Could not create the user.');
    }

    return user;
  }

  async updateUser(data: CreateUserInput): Promise<User> {
    const user = this.userRepository.create(data);
    const foundUser = await this.userRepository.findOne({
      select: ['id'],
      where: { id: user.id },
    });

    if (!foundUser) {
      throw new NotFoundException(`Could not found user with id = ${user.id}.`);
    }

    const savedUser = await this.userRepository.save(user);

    if (!savedUser) {
      throw new InternalServerErrorException('Could not update the user.');
    }

    return user;
  }
}
