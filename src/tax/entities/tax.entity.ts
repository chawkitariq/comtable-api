import { CompanyEntity } from 'src/company/entities/company.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { TaxTypeEnum } from '../tax.type';
import { Exclude, Expose } from 'class-transformer';

@Entity({ name: 'taxes' })
export class TaxEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 15, scale: 4 })
  rate: number;

  @Column({ type: 'enum', enum: TaxTypeEnum })
  type: string;

  @ManyToOne(() => CompanyEntity, { nullable: true })
  @JoinColumn({ name: 'company_id' })
  company?: Relation<CompanyEntity>;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  createdBy?: Relation<UserEntity>;

  @Exclude()
  @Column({ name: 'disabled_at', type: 'timestamptz', nullable: true })
  disabledAt?: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt?: Date;

  @Expose()
  get isEnabled() {
    return !(this.disabledAt instanceof Date);
  }
}
