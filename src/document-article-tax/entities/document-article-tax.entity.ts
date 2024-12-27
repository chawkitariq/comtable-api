import { Company } from 'src/company/entities/company.entity';
import { DocumentArticle } from 'src/document-article/entities/document-article.entity';
import { Document } from 'src/document/entities/document.entity';
import { Tax } from 'src/tax/entities/tax.entity';
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

@Entity({ name: 'document_article_taxes' })
export class DocumentArticleTax {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column({ type: 'integer', default: 0 })
  amount: number;

  @ManyToOne(() => Company, { nullable: true })
  @JoinColumn({ name: 'company_id' })
  company?: Relation<Company>;

  @ManyToOne(() => Document, { nullable: true })
  @JoinColumn({ name: 'document_id' })
  document?: Relation<Document>;

  @ManyToOne(() => DocumentArticle, { nullable: true })
  @JoinColumn({ name: 'document_article_id' })
  documentArticle?: Relation<DocumentArticle>;

  @ManyToOne(() => Tax, { nullable: true })
  @JoinColumn({ name: 'tax_id' })
  tax?: Relation<Tax>;

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
