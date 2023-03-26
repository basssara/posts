import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { UserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  create(userDto: UserDto) {
    return this.repository.save(userDto);
  }

  async findAll(query: any) {
    const take = query.take || 10;
    const skip = query.skip || 0;
    const keyword = query.keyword || '';

    const [result, total] = await this.repository.findAndCount({
      where: { email: Like('%' + keyword + '%') },
      order: { id: 'DESC' },
      take: take,
      skip: skip,
    });

    if (!result.length) {
      throw new NotFoundException('Users does not exist!');
    }

    return {
      data: result,
      count: total,
    };
  }

  async findOne(id: number) {
    const user = await this.repository.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    return user;
  }

  findByCond(cond: UserDto) {
    return this.repository.findOneBy(cond);
  }
}
