import { CompanyEntity } from 'src/company/entities/company.entity';
import { DocumentArticleEntity } from 'src/document-article/entities/document-article.entity';
import { DocumentEntity } from 'src/document/entities/document.entity';
import { TaxEntity } from 'src/tax/entities/tax.entity';
import { TaxTypeEnum } from 'src/tax/tax.type';
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

@Entity({ name: 'document_article_taxes' })
export class DocumentArticleTaxEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: TaxTypeEnum })
  type: TaxTypeEnum;

  @Column({ type: 'integer', default: 0 })
  amount: number;

  @ManyToOne(() => CompanyEntity, { nullable: true })
  @JoinColumn({ name: 'company_id' })
  company?: Relation<CompanyEntity>;

  @ManyToOne(() => DocumentEntity, { nullable: true })
  @JoinColumn({ name: 'document_id' })
  document?: Relation<DocumentEntity>;

  @ManyToOne(() => DocumentArticleEntity, {
    nullable: true,
    orphanedRowAction: 'soft-delete',
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'document_article_id' })
  documentArticle?: Relation<DocumentArticleEntity>;

  @ManyToOne(() => TaxEntity, { nullable: true })
  @JoinColumn({ name: 'tax_id' })
  tax?: Relation<TaxEntity>;

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
