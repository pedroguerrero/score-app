import { EntityRepository, Repository } from 'typeorm';
import { Match } from '../entities/match.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateMatchDto } from '../dto/create-match.dto';
import { UpdateMatchDto } from '../dto/update-match.dto';

@EntityRepository(Match)
export class MatchesRepository extends Repository<Match> {
  createMatch(createMatchDto: CreateMatchDto): Promise<Match> {
    const match = this.create(createMatchDto);

    return this.save(match);
  }

  async updateMatch(
    matchId: string,
    updateMatchDto: UpdateMatchDto,
  ): Promise<void> {
    const response = await this.update({ id: matchId }, updateMatchDto);

    if (response.affected === 0) {
      throw new NotFoundException(`Match with id: ${matchId} not found`);
    }

    return;
  }
}
