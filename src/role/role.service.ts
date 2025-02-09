import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dtos/create-role.dto';
import { UpdateRoleDto } from './dtos/update-role.dto';
import { RoleEntity } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    public readonly repository: Repository<RoleEntity>,
  ) {}

  create(dto: CreateRoleDto) {
    return this.repository.save(dto);
  }

  findAllByUser(userId: string) {
    return this.repository.findBy({ createdBy: { id: userId } });
  }

  findOneByUser(userId: string, id: string) {
    return this.repository.findOneBy({ id, createdBy: { id: userId } });
  }

  update(id: string, dto: UpdateRoleDto) {
    return this.repository.manager.transaction(async (manager) => {
      await manager.save(RoleEntity, { id, ...dto });
      return manager.findOneBy(RoleEntity, { id });
    });
  }

  remove(id: string) {
    return this.repository.delete({ id });
  }

  isExistsByUserAndName(userId: string, name: string) {
    return this.repository.existsBy({ name, createdBy: { id: userId } });
  }
}
