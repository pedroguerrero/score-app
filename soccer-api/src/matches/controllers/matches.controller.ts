import { HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Param,
  Put,
  HttpCode,
} from '@nestjs/common';
import { Match } from '../entities/match.entity';
import { CreateMatchDto } from '../dto/create-match.dto';
import { MatchesService } from '../services/matches.service';
import { UpdateMatchDto } from '../dto/update-match.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Matches')
@Controller('/api/v1/matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @ApiCreatedResponse({
    description: 'Match created.',
    type: Match,
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Post()
  async createMatch(@Body() createMatchDto: CreateMatchDto): Promise<Match> {
    return this.matchesService.createMatch(createMatchDto);
  }

  @ApiOkResponse({
    description: 'Get all matches',
    type: Match,
    isArray: true,
  })
  @Get()
  getMatches(): Promise<Match[]> {
    return this.matchesService.getAllMatches();
  }

  @ApiOkResponse({
    description: 'Get match',
    type: Match,
  })
  @Get(':id')
  getMatch(@Param('id') id: string): Promise<Match> {
    return this.matchesService.getMatch(id);
  }

  @ApiNoContentResponse({
    description: 'Update match',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  updateMatch(
    @Param('id') id: string,
    @Body() updateMatchDto: UpdateMatchDto,
  ): Promise<void> {
    return this.matchesService.updateMatch(id, updateMatchDto);
  }
}
