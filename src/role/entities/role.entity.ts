import { PermissionEntity } from 'src/permission/entities/permission.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'roles' })
@Unique(['name'])
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @OneToMany(() => PermissionEntity, (permission) => permission.role, {
    eager: true,
    cascade: true,
    orphanedRowAction: 'delete',
  })
  permissions?: Relation<PermissionEntity[]>;

  @OneToMany(() => UserEntity, (user) => user.role)
  users?: Relation<UserEntity[]>;

  @ManyToOne(() => UserEntity, { eager: true, nullable: true })
  @JoinColumn({ name: 'created_by' })
  createdBy?: Relation<UserEntity>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
