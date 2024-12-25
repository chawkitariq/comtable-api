import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    public readonly roleRepository: Repository<Role>,
  ) {}

  create(dto: CreateRoleDto) {
    return this.roleRepository.save(dto);
  }

  findAll() {
    return this.roleRepository.find();
  }

  findOne(id: string) {
    return this.roleRepository.findOne({ where: { id } });
  }

  update(id: string, dto: UpdateRoleDto) {
    return this.roleRepository.update(id, dto);
  }

  remove(id: string) {
    return this.roleRepository.delete(id);
  }
}
