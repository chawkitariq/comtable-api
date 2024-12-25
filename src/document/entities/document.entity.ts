import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
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

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt?: Date;
}
