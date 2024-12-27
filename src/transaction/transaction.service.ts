import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { UpdateTransactionDto } from './dtos/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    public readonly transactionRepository: Repository<Transaction>,
  ) {}

  create(dto: CreateTransactionDto) {
    return this.transactionRepository.save(dto);
  }

  findAll() {
    return this.transactionRepository.find();
  }

  findOne(id: string) {
    return this.transactionRepository.findOne({ where: { id } });
  }

  update(id: string, dto: UpdateTransactionDto) {
    return this.transactionRepository.update(id, dto);
  }

  remove(id: string) {
    return this.transactionRepository.softDelete(id);
  }
}
