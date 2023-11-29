import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { chatSchema } from './model/chat.model';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Chat', schema: chatSchema }]),
    ConfigModule,
  ],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
