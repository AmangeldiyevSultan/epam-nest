import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { error } from 'console';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService
  ) { }

  create(dto: CreateUserDto) {
    const user = new this.userModel(dto);
    return user.save();
  }

  async findByUsername(username: string) {
    return this.userModel.findOne({ username });
  }

  async findByToken(token: string) {
    const decodedToken = this.jwtService.decode(token);
    const user = this.userModel.findById(decodedToken.id);
    const userObj = (await user).toObject();
    return { result: userObj, error: null };
  }
}
