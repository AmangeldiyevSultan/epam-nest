import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtToken } from 'src/decorators/jwt-token.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('/me')
  getMe(@JwtToken() token) {
    return this.usersService.findByToken(token);
  }
}
