import { Exclude } from 'class-transformer';
import { PermissionEntity } from 'src/permission/entities/permission.entity';
import { RoleEntity } from 'src/role/entities/role.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { InvitationStatusEnum } from '../invitation.type';

@Entity({ name: 'invitations' })
@Unique(['sender', 'email', 'deletedAt'])
export class InvitationEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({
    type: 'enum',
    enum: InvitationStatusEnum,
    default: InvitationStatusEnum.Pending,
  })
  status: InvitationStatusEnum;

  @Column({ nullable: true })
  email: string;

  @Column({ name: 'expired_at', type: 'timestamptz', nullable: true })
  expiredAt?: Date;

  @OneToOne(() => UserEntity, {
    eager: true,
    nullable: true,
    orphanedRowAction: 'soft-delete',
  })
  @JoinColumn({ name: 'recipient_id' })
  recipient?: Relation<UserEntity>;

  @ManyToOne(() => RoleEntity, { nullable: true })
  @JoinColumn({ name: 'role_id' })
  role?: Relation<RoleEntity>;

  @ManyToOne(() => UserEntity, { eager: true, nullable: true })
  @JoinColumn({ name: 'sender_id' })
  sender?: Relation<UserEntity>;

  @OneToMany(() => PermissionEntity, (permission) => permission.invitation, {
    eager: true,
    cascade: true,
  })
  permissions?: Relation<PermissionEntity[]>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt?: Date;
}
