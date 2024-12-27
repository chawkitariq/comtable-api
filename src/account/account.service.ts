import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dtos/create-account.dto';
import { UpdateAccountDto } from './dtos/update-account.dto';
import { Account } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    public readonly accountRepository: Repository<Account>,
  ) {}

  create(dto: CreateAccountDto) {
    return this.accountRepository.save(dto);
  }

  findAll() {
    return this.accountRepository.find();
  }

  findOne(id: string) {
    return this.accountRepository.findOne({ where: { id } });
  }

  update(id: string, dto: UpdateAccountDto) {
    return this.accountRepository.update(id, dto);
  }

  remove(id: string) {
    return this.accountRepository.softDelete(id);
  }
}
