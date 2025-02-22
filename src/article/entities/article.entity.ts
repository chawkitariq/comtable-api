import { CategoryEntity } from 'src/category/entities/category.entity';
import { CompanyEntity } from 'src/company/entities/company.entity';
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
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { ArticleTypeEnum } from '../article.type';
import { Exclude, Expose, Transform } from 'class-transformer';
import { ArticleTaxEntity } from './article-tax.entity';

@Entity({ name: 'articles' })
@Unique(['company', 'sku', 'deletedAt'])
export class ArticleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: ArticleTypeEnum,
  })
  type: ArticleTypeEnum;

  @Column({ nullable: true })
  sku?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({
    name: 'sale_price',
    type: 'decimal',
    precision: 15,
    scale: 4,
    nullable: true,
  })
  salePrice?: number;

  @Column({
    name: 'purchase_price',
    type: 'decimal',
    precision: 15,
    scale: 4,
    nullable: true,
  })
  purchasePrice?: number;

  @Transform(({ value: taxes }) => taxes.map(({ tax }) => tax))
  @OneToMany(() => ArticleTaxEntity, (articleTax) => articleTax.article, {
    eager: true,
    cascade: true,
    nullable: true,
  })
  taxes?: Relation<ArticleTaxEntity[]>;

  @ManyToOne(() => CompanyEntity, { nullable: true })
  @JoinColumn({ name: 'company_id' })
  company?: Relation<CompanyEntity>;

  @ManyToOne(() => CategoryEntity, { eager: true, nullable: true })
  @JoinColumn({ name: 'category_id' })
  category?: Relation<CategoryEntity>;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  createdBy?: Relation<UserEntity>;

  @Exclude()
  @Column({ name: 'disabled_at', type: 'timestamptz', nullable: true })
  disabledAt?: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt?: Date;

  @Expose()
  get isEnabled() {
    return !(this.disabledAt instanceof Date);
  }
}
