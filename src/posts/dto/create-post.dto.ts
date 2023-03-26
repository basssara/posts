import { IsNotEmpty, Length } from 'class-validator';

export class PostDto {
  @IsNotEmpty({ message: 'Title can not be empty' })
  @Length(5, 20, { message: 'Title must have minimum 5 characters' })
  title: string;

  @IsNotEmpty({ message: 'Content can not be empty' })
  @Length(10, 255, { message: 'Content must have minimum 5 characters' })
  content: string;
}
