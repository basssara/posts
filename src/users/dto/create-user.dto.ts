import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class UserDto {
  @IsEmail(undefined, { message: 'Email is invalid' })
  email: string;

  @IsNotEmpty()
  @Length(6, 32, { message: 'Password must have minimum 6 characters' })
  password?: string;
}
