import { Category } from 'src/category/entities/category.entity';
import { CompanyEntity } from 'src/company/entities/company.entity';
import { ContactEntity } from 'src/contact/entities/contact.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { DocumentArticle } from './document-article.entity';

@Entity({ name: 'documents' })
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'document_number', nullable: true })
  number: string;

  @Column({ name: 'order_number', nullable: true })
  orderNumber?: string;

  @Column({ default: 'invoice' })
  type: string;

  @Column({ default: 'unpaid' })
  status: string;

  @Column({ name: 'issued_at', type: 'timestamptz', nullable: true })
  issuedAt: Date;

  @Column({ name: 'due_at', type: 'timestamptz', nullable: true })
  dueAt: Date;

  @Column({ name: 'currency_code', nullable: true })
  currencyCode?: string;

  @Column({ name: 'currency_rate', type: 'integer', default: 0 })
  currencyRate: number;

  @Column({ name: 'contact_name', nullable: true })
  contactName?: string;

  @Column({ name: 'contact_email', nullable: true })
  contactEmail?: string;

  @Column({ name: 'contact_phone', nullable: true })
  contactPhone?: string;

  @Column({ name: 'contact_address', type: 'text', nullable: true })
  contactAddress?: string;

  @Column({ name: 'contact_city', nullable: true })
  contactCity?: string;

  @Column({ name: 'contact_postal_code', nullable: true })
  contactPostalCode?: string;

  @Column({ name: 'contact_state', nullable: true })
  contactState?: string;

  @Column({ name: 'contact_country', nullable: true })
  contactCountry?: string;

  @Column({ type: 'text', nullable: true })
  note?: string;

  @Column({ type: 'text', nullable: true })
  footer?: string;

  @Column({ nullable: true })
  title?: string;

  @Column({ name: 'sub_title', nullable: true })
  subTitle?: string;

  @Column({ nullable: true })
  template?: string;

  @Column({ nullable: true })
  color?: string;

  @OneToMany(
    () => DocumentArticle,
    (documentArticle) => documentArticle.document,
  )
  articles?: Relation<DocumentArticle[]>;

  @ManyToOne(() => CompanyEntity, { nullable: true })
  @JoinColumn({ name: 'company_id' })
  company?: Relation<CompanyEntity>;

  @ManyToOne(() => ContactEntity, { nullable: true })
  @JoinColumn({ name: 'contact_id' })
  contact?: Relation<ContactEntity>;

  @ManyToOne(() => Category, { nullable: true })
  @JoinColumn({ name: 'category_id' })
  category?: Relation<Category>;

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
