import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    public readonly repository: Repository<UserEntity>,
  ) {}

  create(dto: CreateUserDto) {
    return this.repository.save(dto);
  }

  findAll() {
    return this.repository.find();
  }

  findAllByCreatedBy(createdBy: string) {
    return this.repository.findBy({ createdBy: { id: createdBy } });
  }

  findOne(id: string) {
    return this.repository.findOne({ where: { id } });
  }

  findOneByEmail(email: string) {
    return this.repository.findOne({ where: { email } });
  }

  findOneByCreatedBy(createdBy: string, id: string) {
    return this.repository.findOneBy({ id, createdBy: { id: createdBy } });
  }

  isExistsByEmail(email: string) {
    return this.repository.existsBy({ email });
  }

  update(id: string, dto: UpdateUserDto) {
    return this.repository.update(id, dto);
  }

  remove(id: string) {
    return this.repository.softDelete(id);
  }
}
