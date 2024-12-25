import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'currencies' })
export class Curreny {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column({ nullable: true })
  symbol?: string;

  @Column({ type: 'float' })
  rate: number;

  @Column({ nullable: true })
  precision?: string;

  @Column({ name: 'symbol_first', type: 'integer', default: 1 })
  symbolFirst: number;

  @Column({ name: 'decimal_mark', nullable: true })
  decimalMark?: string;

  @Column({ name: 'thousands_separator', nullable: true })
  thousandsSeparator?: string;

  @Column({ name: 'disabled_at', type: 'timestamptz', nullable: true })
  disabledAt?: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'updated_at', type: 'timestamptz' })
  deletedAt?: Date;
}
