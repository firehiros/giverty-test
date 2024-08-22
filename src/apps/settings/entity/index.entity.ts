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

import ProviderEntity from '../../providers/entity/provider.entity';

export enum SettingTypes {
  TEXT = 'text',
  IMAGE = 'image',
}

@Entity({ name: 'settings' })
export default class SettingEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  key: string;

  @Column()
  value: string;

  @Column({
    type: 'enum',
    enum: SettingTypes,
    default: SettingTypes.TEXT,
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
  @ManyToOne(() => ProviderEntity)
  @JoinColumn()
  provider: ProviderEntity;
}
