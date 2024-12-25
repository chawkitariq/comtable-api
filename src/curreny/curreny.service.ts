import { Injectable } from '@nestjs/common';
import { CreateCurrenyDto } from './dto/create-curreny.dto';
import { UpdateCurrenyDto } from './dto/update-curreny.dto';

@Injectable()
export class CurrenyService {
  create(createCurrenyDto: CreateCurrenyDto) {
    return 'This action adds a new curreny';
  }

  findAll() {
    return `This action returns all curreny`;
  }

  findOne(id: number) {
    return `This action returns a #${id} curreny`;
  }

  update(id: number, updateCurrenyDto: UpdateCurrenyDto) {
    return `This action updates a #${id} curreny`;
  }

  remove(id: number) {
    return `This action removes a #${id} curreny`;
  }
}
