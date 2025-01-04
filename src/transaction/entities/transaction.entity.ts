import { Account } from 'src/account/entities/account.entity';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { CompanyEntity } from 'src/company/entities/company.entity';
import { ContactEntity } from 'src/contact/entities/contact.entity';
import { DocumentEntity } from 'src/document/entities/document.entity';
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

@Entity({ name: 'transactions' })
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column({ type: 'integer' })
  amount: string;

  @Column({ name: 'currency_code' })
  currencyCode: string;

  @Column({ name: 'currency_rate', type: 'integer' })
  currencyRate: number;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ nullable: true })
  reference?: string;

  @Column({ name: 'paid_at', type: 'timestamptz' })
  paidAt: Date;

  @Column({
    name: 'reconciled_at',
    type: 'timestamptz',
    nullable: true,
  })
  reconciledAt: Date;

  @ManyToOne(() => CompanyEntity, { nullable: true })
  @JoinColumn({ name: 'company_id' })
  company?: Relation<CompanyEntity>;

  @ManyToOne(() => Account, { nullable: true })
  @JoinColumn({ name: 'account_id' })
  account?: Relation<Account>;

  @ManyToOne(() => DocumentEntity, { nullable: true })
  @JoinColumn({ name: 'document_id' })
  document?: Relation<DocumentEntity>;

  @ManyToOne(() => ContactEntity, { nullable: true })
  @JoinColumn({ name: 'contact_id' })
  contact?: Relation<ContactEntity>;

  @ManyToOne(() => CategoryEntity, { nullable: true })
  @JoinColumn({ name: 'category_id' })
  category?: Relation<CategoryEntity>;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  createdBy?: Relation<UserEntity>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt?: Date;
}
