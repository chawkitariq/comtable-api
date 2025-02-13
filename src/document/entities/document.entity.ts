import { CategoryEntity } from 'src/category/entities/category.entity';
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
import { DocumentStatusEnum, DocumentTypeEnum } from '../document.type';
import { DocumentArticleEntity } from 'src/document-article/entities/document-article.entity';

@Entity({ name: 'documents' })
export class DocumentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'number', nullable: true })
  number: string;

  @Column({ name: 'order_number', nullable: true })
  orderNumber?: string;

  @Column({
    type: 'enum',
    enum: DocumentTypeEnum,
  })
  type: DocumentTypeEnum;

  @Column({
    type: 'enum',
    enum: DocumentStatusEnum,
    default: DocumentStatusEnum.Draft,
  })
  status: DocumentStatusEnum;

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
    () => DocumentArticleEntity,
    (documentArticleEntity) => documentArticleEntity.document,
    {
      eager: true,
      cascade: true,
      orphanedRowAction: 'soft-delete',
    },
  )
  documentArticles?: Relation<DocumentArticleEntity[]>;

  @ManyToOne(() => CompanyEntity, { nullable: true })
  @JoinColumn({ name: 'company_id' })
  company?: Relation<CompanyEntity>;

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
