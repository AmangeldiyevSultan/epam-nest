import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { hashPassword, isValidPassword } from 'src/services/bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async register(dto: CreateUserDto) {
    const { password } = dto;
    const hashedPassword = await hashPassword(password);
    const user = await this.usersService.create({ ...dto, password: hashedPassword });

    const token = this.jwtService.sign({ id: user._id, role: user.role });
    return { result: { user, token }, error: null };
  }

  async login(dto: LoginUserDto) {
    const { username, password } = dto;
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      return { result: null, error: new UnauthorizedException('Email or password incorrect') };
    }

    const passwordIsValid = await isValidPassword(password, user.password);
    if (!passwordIsValid) {
      return { result: null, error: new UnauthorizedException('Email or password incorrect') };
    }

    const token = this.jwtService.sign({ id: user._id, role: user.role });
    return { result: { user, token }, error: null };
  }

}
