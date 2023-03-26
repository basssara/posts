import { PartialType } from '@nestjs/mapped-types';
import { PostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(PostDto) {}
