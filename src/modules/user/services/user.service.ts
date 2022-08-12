import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateDto } from '../dto/user.create.dto';
import { UserUpdateDto } from '../dto/user.update.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
      @InjectRepository(User)
      private userRepository: Repository<User>
  ) {}

  async getAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['products'], order: { username: 'ASC' } });
  }

  async getByUserName(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }

  async getById(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(userCreateDto: UserCreateDto): Promise<User> {
    return this.userRepository.save(userCreateDto);
  }

  async update(updateUserDto: UserUpdateDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: updateUserDto.id } });
    return this.userRepository.save({
      ...user,
      ...updateUserDto
    });
  }

  async remove(id: string) {
    const user: User = await this.userRepository.findOne({ where: { id } });
    return this.userRepository.remove(user);
  }
}
