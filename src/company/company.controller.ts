import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { UpdateCompanyDto } from './dtos/update-company.dto';
import { User } from 'src/authentication/decorators/user.decrator';
import { UserEntity } from 'src/user/entities/user.entity';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  create(@User() user: UserEntity, @Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create({
      ...createCompanyDto,
      createdBy: user,
    });
  }

  @Get()
  findAll(@User('id') userId: string) {
    return this.companyService.findAllByUser(userId);
  }

  @Get(':company')
  findOne(@Param('company') id: string) {
    return this.companyService.findOne(id);
  }

  @Patch(':company')
  update(
    @User('id') userId: string,
    @Param('company') companyId: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companyService.updateByUser(
      companyId,
      userId,
      updateCompanyDto,
    );
  }

  @Delete(':company')
  remove(@User('id') userId: string, @Param('company') id: string) {
    return this.companyService.removeByUser(id, userId);
  }
}
