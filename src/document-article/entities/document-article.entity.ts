import { Article } from 'src/article/entities/article.entity';
import { CompanyEntity } from 'src/company/entities/company.entity';
import { Document } from 'src/document/entities/document.entity';
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

@Entity({ name: 'document_articles' })
export class DocumentArticle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ nullable: true })
  sku?: string;

  @Column({ type: 'integer' })
  quantity: number;

  @Column({ type: 'integer' })
  price: number;

  @Column({ type: 'integer', default: 0 })
  tax: number;

  @Column({ name: 'discount_type', default: 'normal' })
  discountType: string;

  @Column({ name: 'discount_rate', type: 'integer', default: 0 })
  discountRate: string;

  @Column({ type: 'integer' })
  total: string;

  @ManyToOne(() => CompanyEntity, { nullable: true })
  @JoinColumn({ name: 'company_id' })
  company?: Relation<CompanyEntity>;

  @ManyToOne(() => Document, { nullable: true })
  @JoinColumn({ name: 'document_id' })
  document?: Relation<Document>;

  @ManyToOne(() => Article, { nullable: true })
  @JoinColumn({ name: 'article_id' })
  article?: Relation<Article>;

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
