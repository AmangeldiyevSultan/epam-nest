import { Module } from '@nestjs/common';
import { ConfigModule } from './common/config/config.module';
import { UsersModule } from './resources/users/users.module';
import { AuthModule } from './resources/auth/auth.module';
import { MongooseConfigModule } from './common/database/database.module';
import { SpeechModule } from './resources/speech/speech.module';
import { GptModule } from './resources/gpt/gpt.module';

@Module({
  imports: [ConfigModule, UsersModule, AuthModule, MongooseConfigModule, SpeechModule, GptModule],
  controllers: [],
})
export class AppModule { }
