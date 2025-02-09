import { RoleEntity } from 'src/role/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { PermissionActionEnum } from '../permission.type';

@Entity({ name: 'permissions' })
@Unique(['subject', 'action'])
export class PermissionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  subject: string;

  @Column({
    type: 'enum',
    enum: PermissionActionEnum,
  })
  action: PermissionActionEnum;

  @ManyToOne(() => RoleEntity, {
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'role_id' })
  role?: Relation<RoleEntity>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
