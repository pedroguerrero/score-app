import { Injectable, NotFoundException } from '@nestjs/common';
import { Match } from '../entities/match.entity';
import { CreateMatchDto } from '../dto/create-match.dto';
import { MatchesRepository } from '../repositories/matches.repository';
import { UpdateMatchDto } from '../dto/update-match.dto';
import { EventsGateway } from 'src/events/events.gateway';

@Injectable()
export class MatchesService {
  constructor(
    private readonly matchesRepository: MatchesRepository,
    private readonly eventsGateway: EventsGateway,
  ) {}

  async createMatch(createMatchDto: CreateMatchDto): Promise<Match> {
    const match = await this.matchesRepository.createMatch(createMatchDto);
    this.eventsGateway.newMatch(match);

    return match;
  }

  getAllMatches(): Promise<Match[]> {
    return this.matchesRepository.find();
  }

  async getMatch(id: string): Promise<Match> {
    const match = await this.matchesRepository.findOne({
      where: { id },
      relations: ['comments'],
    });

    if (!match) {
      throw new NotFoundException(`Match with id: ${id} not found`);
    }

    return match;
  }

  async updateMatch(
    matchId: string,
    updateMatchDto: UpdateMatchDto,
  ): Promise<void> {
    await this.matchesRepository.updateMatch(matchId, updateMatchDto);

    this.eventsGateway.score({ id: matchId, ...updateMatchDto });

    return;
  }
}
