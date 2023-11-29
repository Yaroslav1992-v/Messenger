import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getMongoConfig } from './config/mongo.config';
import { JwtModule } from './jwt/jwt.module';
import { FileModule } from './file/file.module';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    JwtModule,
    FileModule,
    ChatModule,
    MessageModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
