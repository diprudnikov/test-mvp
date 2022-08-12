import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { RBAcPermissions } from 'nestjs-rbac';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ProductService } from '../../product/services/product.service';
import { calculateChange } from '../../../shared/helpers';
import { UserBuyDto } from '../dto/user.buy.dto';
import { UserBuyResponseDto } from '../dto/user.buy.response.dto';
import { UserDepositDto } from '../dto/user.deposit.dto';
import { UserResponseDto } from '../dto/user.response.dto';
import { UserUpdateDto } from '../dto/user.update.dto';
import { UserService } from '../services/user.service';
import { plainToClass } from 'class-transformer';

@ApiBearerAuth()
@ApiTags('user')
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(
      private readonly userService: UserService,
      private readonly productService: ProductService
  ) {}

  @ApiOkResponse({ type: UserResponseDto, isArray: true })
  @RBAcPermissions('user@read')
  @Get()
  async getAll(): Promise<UserResponseDto[]> {
    const result = await this.userService.getAll();
    return plainToClass(UserResponseDto, result, { excludeExtraneousValues: true });
  }

  @ApiOkResponse({ type: UserResponseDto })
  @ApiParam({ name: 'id', required: true })
  @RBAcPermissions('user@read')
  @Get(':id')
  async getById(@Param('id') id: string): Promise<UserResponseDto>  {
    const result = await this.userService.getById(id);
    return plainToClass(UserResponseDto, result, { excludeExtraneousValues: true });
  }

  @ApiOkResponse({ type: UserResponseDto })
  @RBAcPermissions('user@update')
  @Put()
  async update(@Body() userUpdateDto: UserUpdateDto): Promise<UserResponseDto>  {
    const result = await this.userService.update(userUpdateDto);
    return plainToClass(UserResponseDto, result, { excludeExtraneousValues: true });
  }

  @ApiOkResponse({ type: UserResponseDto })
  @RBAcPermissions('user@deposit')
  @Post('deposit')
  async deposit(@Body() userDepositDto: UserDepositDto): Promise<UserResponseDto>  {
    const user = await this.userService.getById(userDepositDto.id);
    const deposit = user.deposit + userDepositDto.deposit;
    const result = await this.userService.update({...user, deposit });
    return plainToClass(UserResponseDto, result, { excludeExtraneousValues: true });
  }

  @ApiOkResponse({ type: UserResponseDto })
  @RBAcPermissions('user@buy')
  @Post('buy')
  async buy(@Body() userBuyDto: UserBuyDto): Promise<UserBuyResponseDto> {
    const product = await this.productService.getById(userBuyDto.productId);
    const user = await this.userService.getById(userBuyDto.id);
    const totalSpent = product.cost * userBuyDto.amount;
    if (user.deposit < totalSpent || product.amountAvailable >= userBuyDto.amount) {
      await this.productService.update({
        ...product,
        amountAvailable: product.amountAvailable - userBuyDto.amount
      });

      await this.userService.update({
        ...user,
        deposit: 0
      });

      const change = calculateChange(user.deposit - totalSpent);

      return {
        totalSpent,
        productPurchased: product.productName,
        change,
      }
    }
  }

  @ApiOkResponse({ type: UserResponseDto })
  @ApiParam({ name: 'id', required: true })
  @RBAcPermissions('user@delete')
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<UserResponseDto>  {
    const result = await this.userService.remove(id);
    return plainToClass(UserResponseDto, result, { excludeExtraneousValues: true });
  }

  @ApiOkResponse({ type: UserResponseDto })
  @ApiParam({ name: 'id', required: true })
  @RBAcPermissions('user@reset')
  @Post(':id/reset')
  async reset(@Param('id') id: string): Promise<UserResponseDto>  {
    const result = await this.userService.update({ id, deposit: 0 });
    return plainToClass(UserResponseDto, result, { excludeExtraneousValues: true });
  }
}
