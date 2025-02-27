import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './infra/db/db.module';
import { MoviesModule } from './modules/movies/movies.module';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    DatabaseModule,
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
