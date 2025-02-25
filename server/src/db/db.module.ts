import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DrizzleService } from './drizzle.service';
import databaseConfig from '../config/database.config';

@Global()
@Module({
  imports: [ConfigModule.forFeature(databaseConfig)],
  providers: [DrizzleService],
  exports: [DrizzleService],
})
export class DatabaseModule {}
