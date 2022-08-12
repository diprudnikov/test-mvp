import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RBAcModule } from 'nestjs-rbac';
import { AuthModule } from './modules/auth/auth.module';
import { RBAC } from './config/global.env';
import ormConfig from './config/orm.config';
import { Product } from './modules/product/entities/product.entity';
import { ProductModule } from './modules/product/product.module';
import { User } from './modules/user/entities/user.entity';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
      RBAcModule.forRoot(RBAC),
      AuthModule,
      UserModule,
      ProductModule,
      TypeOrmModule.forRoot(
          {
            ...ormConfig,
            entities: [User, Product]
          }
      ),
  ],
})
export class AppModule {}
