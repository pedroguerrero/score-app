import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Match } from '../entities/match.entity';

export const GetMatch = createParamDecorator(
  (_data, ctx: ExecutionContext): Match => {
    const request = ctx.switchToHttp().getRequest();

    return request.match;
  },
);
