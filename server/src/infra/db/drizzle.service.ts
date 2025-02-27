import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';
import * as schema from './models/movie.model';

@Injectable()
export class DrizzleService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;
  public db: ReturnType<typeof drizzle<typeof schema>>;

  constructor(private configService: ConfigService) {
    const dbConfig = this.configService.get('database');

    this.pool = new Pool({
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.database,
    });

    this.db = drizzle(this.pool, { schema });
  }

  async onModuleInit() {
    // 모든 환경에서 마이그레이션 실행
    try {
      console.log('Running migrations...');
      await migrate(this.db, { migrationsFolder: 'drizzle' });
      console.log('Migrations completed successfully');
    } catch (error) {
      console.error('Migration failed:', error);
    }
  }

  async onModuleDestroy() {
    await this.pool.end();
  }
}
