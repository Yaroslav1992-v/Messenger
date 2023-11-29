import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from 'src/jwt/jwt.service';
import { messageSchema } from './model/message.model';
import { chatSchema } from 'src/chat/model/chat.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Message', schema: messageSchema }]),
    MongooseModule.forFeature([{ name: 'Chat', schema: chatSchema }]),
    ConfigModule,
  ],
  controllers: [MessageController],
  providers: [MessageService, JwtService],
})
export class MessageModule {}
