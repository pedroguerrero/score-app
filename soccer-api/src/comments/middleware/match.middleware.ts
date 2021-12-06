import { Injectable, NestMiddleware } from '@nestjs/common';
import { MatchesService } from '../../matches/services/matches.service';

@Injectable()
export class MatchMiddleware implements NestMiddleware {
  constructor(private readonly matchesService: MatchesService) {}

  async use(req: any, res: any, next: () => void) {
    const {
      params: { id: matchId },
    } = req;

    const match = await this.matchesService.getMatch(matchId);

    req.match = match;

    next();
  }
}
