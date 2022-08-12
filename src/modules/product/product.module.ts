import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Product } from './entities/product.entity';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';

@Module({
  controllers: [ProductController],
  imports: [TypeOrmModule.forFeature([User, Product])],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductModule {}
