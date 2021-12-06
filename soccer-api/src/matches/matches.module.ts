import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { MatchesService } from './services/matches.service';
import { MatchesController } from './controllers/matches.controller';
import { MatchesRepository } from './repositories/matches.repository';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MatchesRepository]),
    AuthModule,
    EventsModule,
  ],
  controllers: [MatchesController],
  providers: [MatchesService],
  exports: [MatchesService],
})
export class MatchesModule {}
