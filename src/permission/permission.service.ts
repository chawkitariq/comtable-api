import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dtos/create-permission.dto';
import { UpdatePermissionDto } from './dtos/update-permission.dto';
import { Permission } from './entities/permission.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    public readonly permissionRepository: Repository<Permission>,
  ) {}

  create(dto: CreatePermissionDto) {
    return this.permissionRepository.save(dto);
  }

  findAll() {
    return this.permissionRepository.find();
  }

  findOne(id: string) {
    return this.permissionRepository.findOne({ where: { id } });
  }

  update(id: string, dto: UpdatePermissionDto) {
    return this.permissionRepository.update(id, dto);
  }

  remove(id: string) {
    return this.permissionRepository.delete(id);
  }
}
