import { InvitationEntity } from 'src/invitation/entities/invitation.entity';
import { RoleEntity } from 'src/role/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'permissions' })
@Unique(['name', 'role', 'invitation'])
export class PermissionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column()
  name: string;

  @ManyToOne(() => RoleEntity, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'role_id' })
  role?: Relation<RoleEntity>;

  @ManyToOne(() => InvitationEntity, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'invitation_id' })
  invitation?: Relation<InvitationEntity>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
