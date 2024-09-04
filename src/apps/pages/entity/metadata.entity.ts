import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  ManyToMany,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
} from 'typeorm';

import { FIELD_TYPE } from '@utils/enum/field.enum';
import { PageEntity } from './page.entity';

@Entity({ name: 'settings' })
export class PageMetadataEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  key: string;

  @Column({
    name: 'label',
    type: 'varchar',
    nullable: true,
  })
  label: string;

  @Column()
  value: string;

  @Column({
    type: 'enum',
    enum: FIELD_TYPE,
    default: FIELD_TYPE.TEXT,
  })
  type: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  // Relation
  @ManyToOne(() => PageEntity)
  @JoinColumn()
  page: PageEntity;
}
