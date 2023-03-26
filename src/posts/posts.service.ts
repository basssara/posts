import { Post } from './entities/post.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostDto } from './dto/create-post.dto';
import { Like, Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private repository: Repository<Post>,
  ) {}

  create(postDto: PostDto) {
    return this.repository.save({
      title: postDto.title,
      content: postDto.content,
      author: { id: 1 },
    });
  }

  async findAll(query: any) {
    const take = query.take || 10;
    const skip = query.skip || 0;
    const keyword = query.keyword || '';

    const [result, total] = await this.repository.findAndCount({
      where: { title: Like('%' + keyword + '%') },
      order: { id: 'DESC' },
      take: take,
      skip: skip,
    });

    if (!result.length) {
      throw new NotFoundException('Posts does not exist!');
    }

    return {
      data: result,
      count: total,
    };
  }

  async popular() {
    const qb = this.repository.createQueryBuilder('p');
    const popular = await qb
      .orderBy('views', 'DESC')
      .take(10)
      .skip(0)
      .getMany();
    return popular;
  }

  async findOne(id: number) {
    const qb = await this.repository
      .createQueryBuilder('posts')
      .update(Post)
      .whereInIds(id)
      .set({
        views: () => 'views + 1',
      })
      .execute();

    if (!qb.affected) {
      throw new NotFoundException('Post does not exist!');
    }

    return this.repository.findOneBy({ id: id });
  }
}
