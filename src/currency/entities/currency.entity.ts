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
import { CurrencySymbolPositionEnum } from '../currency.type';

@Entity({ name: 'currencies' })
export class CurrencyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column({ nullable: true })
  symbol?: string;

  @Column({ type: 'decimal', precision: 15, scale: 8 })
  rate: number;

  @Column({ nullable: true })
  precision?: string;

  @Column({
    name: 'symbol_position',
    type: 'enum',
    enum: CurrencySymbolPositionEnum,
    default: CurrencySymbolPositionEnum.End,
  })
  symbolPosition: CurrencySymbolPositionEnum;

  @Column({ name: 'decimal_mark', nullable: true })
  decimalMark?: string;

  @Column({ name: 'thousands_separator', nullable: true })
  thousandsSeparator?: string;

  @ManyToOne(() => CompanyEntity, { nullable: true })
  @JoinColumn({ name: 'company_id' })
  company?: Relation<CompanyEntity>;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  createdBy?: Relation<UserEntity>;

  @Column({ name: 'disabled_at', type: 'timestamptz', nullable: true })
  disabledAt?: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt?: Date;
}
