import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { configValidationSchema } from './config.schema';
import { MatchesModule } from './matches/matches.module';
import { CommentsModule } from './comments/comments.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.STAGE || 'dev'}`],
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        port: configService.get<number>('DB_PORT'),
        host: configService.get<string>('DB_HOSTNAME'),
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    AuthModule,
    MatchesModule,
    CommentsModule,
    EventsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
