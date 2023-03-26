import { UserDto } from './../users/dto/create-user.dto';
import { User } from './../users/entities/user.entity';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByCond({
      email,
    });
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  generateToken(data: { id: number; email: string }) {
    const payload = { email: data.email, sub: data.id };
    return this.jwtService.sign(payload);
  }

  async signin(user: User) {
    const { password, ...result } = user;
    return {
      ...result,
      access_token: this.generateToken(user),
    };
  }

  async signup(userDto: UserDto) {
    const hash = await bcrypt.hash(userDto.password, 10);

    try {
      const { password, ...result } = await this.usersService.create({
        email: userDto.email,
        password: hash,
      });
      return {
        ...result,
        access_token: this.generateToken(result),
      };
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }
}
