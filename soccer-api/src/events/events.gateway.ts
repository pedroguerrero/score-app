import { Server } from 'socket.io';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Comment } from '../comments/entities/comment.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  newMatch(data: unknown): void {
    this.server.emit('newMatch', data);
  }

  score(data: unknown): void {
    this.server.emit('score', data);
  }

  comment(comment: Comment): void {
    this.server.emit('comment', comment);
  }
}
