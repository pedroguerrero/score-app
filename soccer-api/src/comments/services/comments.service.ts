import { Injectable } from '@nestjs/common';
import { Comment } from '../entities/comment.entity';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentsRepository } from '../repositories/comments.repository';
import { Match } from '../../matches/entities/match.entity';
import { EventsGateway } from 'src/events/events.gateway';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly eventsGateway: EventsGateway,
  ) {}

  async createComment(
    createCommentDto: CreateCommentDto,
    match: Match,
  ): Promise<Comment> {
    const comment = await this.commentsRepository.createComment(
      createCommentDto,
      match,
    );

    this.eventsGateway.comment(comment);

    return comment;
  }
}
