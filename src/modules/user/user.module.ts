import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from '../product/product.module';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User]), ProductModule],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
