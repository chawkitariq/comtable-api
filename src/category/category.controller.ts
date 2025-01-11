import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { User } from 'src/authentication/decorators/user.decrator';
import { CompanyService } from 'src/company/company.service';
import { UserEntity } from 'src/user/entities/user.entity';

@Controller()
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly companyService: CompanyService,
  ) {}

  @Post('/companies/:companyId/categories')
  async create(
    @User() user: UserEntity,
    @Param('companyId') companyId: string,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    const company = await this.companyService.findOneByUser(companyId, user.id);

    if (!company) {
      throw new BadRequestException('Company does not exists');
    }

    return this.categoryService.create({
      ...createCategoryDto,
      company,
      createdBy: user,
    });
  }

  @Get('/companies/:companyId/categories')
  async findAll(
    @User('id') userId: string,
    @Param('companyId') companyId: string,
  ) {
    const company = await this.companyService.findOneByUser(companyId, userId);

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return this.categoryService.findAllByCompany(companyId);
  }

  @Get('categories/:categoryId')
  async findOne(
    @User('id') userId: string,
    @Param('categoryId') categoryId: string,
  ) {
    const category = await this.categoryService.findOneByUser(
      categoryId,
      userId,
    );

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  @Patch('categories/:categoryId')
  update(
    @Param('categoryId') categoryId: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(categoryId, updateCategoryDto);
  }

  @Delete('categories/:categoryId')
  remove(@Param('categoryId') categoryId: string) {
    return this.categoryService.remove(categoryId);
  }
}
