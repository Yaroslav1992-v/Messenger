import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { Message } from 'src/message/model/message.model';
import { User } from 'src/user/model/user.model';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  rooms: Record<string, string[]>;
  constructor() {
    this.rooms = {};
  }
  @WebSocketServer() server: Server;
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }
  handleDisconnect(client: Socket) {
    console.log(`Client disconected: ${client.id}`);
  }
  @SubscribeMessage('setup')
  setup(@MessageBody() id: string, @ConnectedSocket() client: Socket): void {
    client.join(id);
  }
  @SubscribeMessage('join')
  join(@MessageBody() id: string, @ConnectedSocket() client: Socket): void {
    client.join(id);
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() msg: Message,
    @ConnectedSocket() client: Socket,
  ): void {
    const users = this.server.sockets.adapter.rooms.get(msg.chatId.toString());
    if (users.size > 1) {
      client.broadcast.to(msg.chatId.toString()).emit('new-message', msg);
    } else {
      client.emit('users-count', users.size);
    }
  }
  @SubscribeMessage('typing')
  typing(
    @MessageBody() data: { users: string[]; chatId: string; user: User },
    @ConnectedSocket() client: Socket,
  ): void {
    data.users.forEach((u) =>
      client.broadcast
        .to(u)
        .emit('typing', { chatId: data.chatId, user: data.user }),
    );
  }
  @SubscribeMessage('stop-typing')
  stopTyping(
    @MessageBody() data: { users: string[]; chatId: string },
    @ConnectedSocket() client: Socket,
  ): void {
    data.users.forEach((u) =>
      client.broadcast.to(u).emit('stop-typing', data.chatId),
    );
  }
}
