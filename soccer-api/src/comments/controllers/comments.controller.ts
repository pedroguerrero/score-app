import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiTags,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Comment } from '../entities/comment.entity';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentsService } from '../services/comments.service';
import { GetMatch } from '../../matches/decorators/get-match.decorator';
import { CreateCommentResponse } from '../responses/create-comment.response';

@ApiTags('Comments')
@Controller('/api/v1/matches/:id/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiCreatedResponse({
    description: 'Create comment.',
    type: CreateCommentResponse,
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Post()
  async createComment(
    @Param('id') _id: string,
    @GetMatch() match,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<CreateCommentResponse> {
    const { description, createdAt } = await this.commentsService.createComment(
      createCommentDto,
      match,
    );

    return {
      description,
      createdAt,
    };
  }

  @ApiOkResponse({
    description: 'Get comments.',
    type: Comment,
    isArray: true,
  })
  @Get()
  getComments(@Param('id') _id: string, @GetMatch() match) {
    return match.comments;
  }
}
