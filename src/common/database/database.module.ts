import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/resources/users/users.module';

const { DB_URL } = process.env;

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRoot("mongodb+srv://mongouser:0fo9E6UTTr9csbJR@cluster0.sgal5gg.mongodb.net/menger"),
    UsersModule
  ],
})
export class MongooseConfigModule { }
