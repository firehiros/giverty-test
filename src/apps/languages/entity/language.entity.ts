import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { PageDirection } from '@utils/enum';

@Entity({ name: 'languages' })
export class LanguageEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: true,
    unique: true,
  })
  code: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  is_default: boolean;

  @Column({
    type: 'enum',
    enum: PageDirection,
    default: PageDirection.LTR,
  })
  direction: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
