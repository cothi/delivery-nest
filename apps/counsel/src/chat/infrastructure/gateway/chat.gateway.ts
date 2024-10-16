import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // 모든 도메인에서의 접근 허용
  },
})
export class ChatGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('sendMessage')
  handleMessage(client: any, payload: { message: string }): void {
    console.log('emiiit');
    this.server.emit('messageAdded', { message: payload.message });
  }
}
