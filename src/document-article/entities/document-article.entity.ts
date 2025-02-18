import { ArticleEntity } from 'src/article/entities/article.entity';
import { DocumentEntity } from 'src/document/entities/document.entity';
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
import { ArticleTypeEnum } from 'src/article/article.type';
import { DocumentArticleTaxEntity } from 'src/document-article-tax/entities/document-article-tax.entity';
import { CompanyEntity } from 'src/company/entities/company.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'document_articles' })
export class DocumentArticleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: ArticleTypeEnum,
  })
  type: ArticleTypeEnum;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ nullable: true })
  sku?: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  quantity: number;

  @Column({ type: 'decimal', precision: 15, scale: 4 })
  price: number;

  @Column({ type: 'decimal', precision: 15, scale: 4, default: '0.0000' })
  tax: number;

  @Column({ name: 'discount_type', default: 'normal' })
  discountType: string;

  @Column({
    name: 'discount_rate',
    type: 'decimal',
    precision: 15,
    scale: 4,
    default: '0.0000',
  })
  discountRate: string;

  @OneToMany(
    () => DocumentArticleTaxEntity,
    (documentArticleTaxEntity) => documentArticleTaxEntity.documentArticle,
    { eager: true, cascade: true, orphanedRowAction: 'soft-delete' },
  )
  documentArticleTaxes?: Relation<DocumentArticleTaxEntity[]>;

  @ManyToOne(() => DocumentEntity, {
    nullable: true,
    orphanedRowAction: 'soft-delete',
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'document_id' })
  document?: Relation<DocumentEntity>;

  @Exclude()
  @ManyToOne(() => ArticleEntity, { nullable: true })
  @JoinColumn({ name: 'article_id' })
  article?: Relation<ArticleEntity>;

  @Exclude()
  @ManyToOne(() => CompanyEntity, { nullable: true })
  @JoinColumn({ name: 'company_id' })
  company?: Relation<CompanyEntity>;

  @Exclude()
  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  createdBy?: Relation<UserEntity>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt?: Date;
}
