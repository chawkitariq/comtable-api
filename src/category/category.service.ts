import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { Repository } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    public readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepository.save(createCategoryDto);
  }

  findAllByCompany(companyId: string) {
    return this.categoryRepository.find({
      where: { company: { id: companyId } },
      relations: ['company', 'createdBy'],
    });
  }

  findOne(id: string) {
    return this.categoryRepository.findOne({
      where: { id },
      relations: ['company', 'createdBy'],
    });
  }

  findOneByUser(categoryId: string, userId: string) {
    return this.categoryRepository.findOne({
      where: {
        id: categoryId,
        company: {
          createdBy: { id: userId },
        },
      },
      relations: ['company', 'createdBy'],
    });
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryRepository.update(id, updateCategoryDto);
  }

  remove(id: string) {
    return this.categoryRepository.softDelete(id);
  }
}
