import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { ProductCreateDto } from '../dto/product.create.dto';
import { ProductUpdateDto } from '../dto/product.update.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
      @InjectRepository(Product)
      private productRepository: Repository<Product>,
      @InjectRepository(User)
      private userRepository: Repository<User>
  ) {}

  async getAll(): Promise<Product[]> {
    return this.productRepository.find({ order: { productName: 'ASC' } });
  }

  async getAllBySellerId(id): Promise<Product[]> {
    const user = await this.userRepository.findOne({ where: { id } });
    return this.productRepository.find({ where: { user }, order: { productName: 'ASC' } });
  }

  async getById(id): Promise<Product> {
    return this.productRepository.findOne({ where: { id } });
  }

  async create(productCreateDto: ProductCreateDto): Promise<Product> {
    return this.productRepository.save(productCreateDto);
  }

  async update(productUpdateDto: ProductUpdateDto): Promise<Product> {
    const user = await this.productRepository.findOne({ where: { id: productUpdateDto.id } });
    return this.productRepository.save({
      ...user,
      ...productUpdateDto
    });
  }

  async remove(id: string) {
    const product: Product = await this.productRepository.findOne({ where: { id } });
    return this.productRepository.remove(product);
  }
}
