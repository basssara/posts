import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() postDto: PostDto) {
    return this.postsService.create(postDto);
  }

  @Get()
  findAll(@Query() query: string) {
    return this.postsService.findAll(query);
  }

  @Get('/popular')
  popularPosts() {
    return this.postsService.popular();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }
}
