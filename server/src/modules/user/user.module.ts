import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './user.service';
import { DatabaseModule } from 'src/infra/db/db.module';
import { UserController } from 'src/modules/user/user.controller';

@Module({
  imports: [DatabaseModule, ConfigModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
