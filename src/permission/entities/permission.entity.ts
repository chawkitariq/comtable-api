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

@Entity({ name: 'permissions' })
@Unique(['subject'])
export class PermissionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  subject: string;

  @Column({ type: 'boolean', default: false })
  create: boolean;

  @Column({ type: 'boolean', default: false })
  read: boolean;

  @Column({ type: 'boolean', default: false })
  update: boolean;

  @Column({ type: 'boolean', default: false })
  delete: boolean;

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
