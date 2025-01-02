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
  PrimaryGeneratedColumn,
  Relation,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'articles' })
@Unique(['company', 'sku', 'deletedAt'])
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: 'product' })
  type: string;

  @Column({ nullable: true })
  sku?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'sale_price', type: 'integer', default: 0 })
  salePrice?: number;

  @Column({ name: 'purchase_price', type: 'integer', default: 0 })
  purchasePrice?: number;

  @ManyToOne(() => CompanyEntity, { nullable: true })
  @JoinColumn({ name: 'company_id' })
  company?: Relation<CompanyEntity>;

  @ManyToOne(() => CategoryEntity, { nullable: true })
  @JoinColumn({ name: 'category_id' })
  category?: Relation<CategoryEntity>;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  createdBy?: Relation<UserEntity>;

  @Column({ name: 'disabled_at', type: 'timestamptz', nullable: true })
  disabledAt?: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt?: Date;
}
