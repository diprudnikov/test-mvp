import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from '../modules/auth/auth.module';
import { APP } from '../config/global.env';
import { ProductModule } from '../modules/product/product.module';
import { UserModule } from '../modules/user/user.module';

export class SwaggerService {
  constructor(private readonly app: INestApplication) {}

  run(): void {
    const options = new DocumentBuilder()
      .setTitle('MVP API')
      .setDescription('MVP API description')
      .setVersion(APP.API_VERSION)
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(this.app, options, {
      include: [AuthModule, ProductModule, UserModule]
    });

    SwaggerModule.setup(APP.APIDOC_URL, this.app, document);
  }
}
