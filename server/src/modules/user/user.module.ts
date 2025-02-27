import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './user.service';
import { DatabaseModule } from 'src/infra/db/db.module';

@Module({
  imports: [DatabaseModule, ConfigModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
