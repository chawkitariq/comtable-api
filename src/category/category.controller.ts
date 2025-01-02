import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { User } from 'src/authentication/decorators/user.decrator';
import { CompanyService } from 'src/company/company.service';

@Controller()
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly companyService: CompanyService,
  ) {}

  @Post('/companies/:companyId/categories')
  async create(
    @User() user,
    @Param('companyId') companyId: string,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    const company = await this.companyService.findOne(companyId);
    return this.categoryService.create({
      ...createCategoryDto,
      company,
      createdBy: user,
    });
  }

  @Get('/companies/:companyId/categories')
  findAll(@Param('companyId') companyId: string) {
    return this.categoryService.findAll(companyId);
  }

  @Get('categories/:categoryId')
  findOne(@Param('categoryId') categoryId: string) {
    return this.categoryService.findOne(categoryId);
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
