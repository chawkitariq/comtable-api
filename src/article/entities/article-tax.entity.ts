import { CompanyEntity } from 'src/company/entities/company.entity';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { TaxEntity } from 'src/tax/entities/tax.entity';
import { ArticleEntity } from './article.entity';

@Entity({ name: 'article_taxes' })
@Unique(['company', 'article', 'tax', 'deletedAt'])
export class ArticleTaxEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CompanyEntity, { nullable: true })
  @JoinColumn({ name: 'company_id' })
  company?: Relation<CompanyEntity>;

  @ManyToOne(() => ArticleEntity)
  @JoinColumn({ name: 'article_id' })
  article: Relation<ArticleEntity>;

  @ManyToOne(() => TaxEntity)
  @JoinColumn({ name: 'tax_id' })
  tax: Relation<TaxEntity>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt?: Date;
}
