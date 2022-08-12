import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { RBAcPermissions } from 'nestjs-rbac';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UserResponseDto } from '../../user/dto/user.response.dto';
import { ProductCreateDto } from '../dto/product.create.dto';
import { ProductResponseDto } from '../dto/product.response.dto';
import { ProductUpdateDto } from '../dto/product.update.dto';
import { Product } from '../entities/product.entity';
import { ProductService } from '../services/product.service';

@ApiBearerAuth()
@ApiTags('product')
@UseGuards(JwtAuthGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOkResponse({ type: ProductResponseDto, isArray: true })
  @ApiParam({ name: 'id', required: true })
  @RBAcPermissions('product@read')
  @Get()
  async getAll(): Promise<ProductResponseDto[]> {
    const result = await this.productService.getAll();
    return plainToClass(ProductResponseDto, result, { excludeExtraneousValues: true });
  }

  @ApiOkResponse({ type: ProductResponseDto, isArray: true })
  @ApiParam({ name: 'id', required: true })
  @RBAcPermissions('product@read')
  @Get('seller/:id')
  async getAllBySellerId(@Param('id') id: string): Promise<ProductResponseDto[]> {
    const result = await this.productService.getAllBySellerId(id);
    return plainToClass(ProductResponseDto, result, { excludeExtraneousValues: true });
  }

  @ApiOkResponse({ type: ProductResponseDto })
  @ApiParam({ name: 'id', required: true })
  @RBAcPermissions('product@read')
  @Get(':id')
  async getOneById(@Param('id') id: string): Promise<ProductResponseDto> {
    const result = await this.productService.getById(id);
    return plainToClass(ProductResponseDto, result, { excludeExtraneousValues: true });
  }

  @ApiCreatedResponse({ type: ProductResponseDto, isArray: true })
  @RBAcPermissions('product@create')
  @Post()
  async create(@Body() productCreateDto: ProductCreateDto): Promise<ProductResponseDto> {
    const result = await this.productService.create(productCreateDto);
    return plainToClass(ProductResponseDto, result, { excludeExtraneousValues: true });
  }

  @ApiOkResponse({ type: ProductResponseDto })
  @RBAcPermissions('product@update')
  @Put()
  async update(@Body() productUpdateDto: ProductUpdateDto): Promise<ProductResponseDto> {
    const result = await this.productService.update(productUpdateDto);
    return plainToClass(ProductResponseDto, result, { excludeExtraneousValues: true });
  }

  @ApiOkResponse({ type: ProductResponseDto })
  @ApiParam({ name: 'id', required: true })
  @RBAcPermissions('product@delete')
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ProductResponseDto> {
    const result = await this.productService.remove(id);
    return plainToClass(ProductResponseDto, result, { excludeExtraneousValues: true });
  }
}
