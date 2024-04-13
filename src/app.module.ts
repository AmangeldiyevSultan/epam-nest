import { Module } from '@nestjs/common';
import { ConfigModule } from './common/config/config.module';
import { UsersModule } from './resources/users/users.module';
import { AuthModule } from './resources/auth/auth.module';
import { MongooseConfigModule } from './common/database/database.module';

@Module({
  imports: [ConfigModule, UsersModule, AuthModule, MongooseConfigModule],
  controllers: [],
})
export class AppModule { }
