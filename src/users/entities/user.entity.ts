import { Post } from './../../posts/entities/post.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 0 })
  rating: number;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
}
