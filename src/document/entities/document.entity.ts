import { Category } from 'src/category/entities/category.entity';
import { Company } from 'src/company/entities/company.entity';
import { Contact } from 'src/contact/entities/contact.entity';
import { User } from 'src/user/entities/user.entity';
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

@Entity({ name: 'documents' })
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'document_number' })
  documentNumber: string;

  @Column({ name: 'order_number', nullable: true })
  orderNumber?: string;

  @Column()
  type: string;

  @Column()
  status: string;

  @Column({ name: 'issued_at', type: 'timestamptz' })
  issuedAt: Date;

  @Column({ name: 'due_at', type: 'timestamptz' })
  dueAt: Date;

  @Column({ name: 'currency_code' })
  currencyCode: string;

  @Column({ name: 'currency_rate', type: 'float' })
  currencyRate: number;

  @Column({ name: 'contact_name' })
  contactName: string;

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

  @ManyToOne(() => Company, { nullable: true })
  @JoinColumn({ name: 'company_id' })
  company?: Relation<Company>;

  @ManyToOne(() => Contact, { nullable: true })
  @JoinColumn({ name: 'contact_id' })
  contact?: Relation<Contact>;

  @ManyToOne(() => Category, { nullable: true })
  @JoinColumn({ name: 'category_id' })
  category?: Relation<Category>;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  createdBy?: Relation<User>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt?: Date;
}
