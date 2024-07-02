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
} from 'typeorm';

import ProviderEntity from '../../providers/entity/provider.entity';
import PhotoEntity from '../../photos/entity';

@Entity({ name: 'system_config' })
export class SystemConfigEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  app_name: string;

  @Column()
  admin_email: string;

  @Column({ nullable: true })
  timezone: string;

  @Column({ nullable: true })
  google_id: string;

  @Column({ nullable: true })
  google_key: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  // Relation

  @ManyToOne(() => ProviderEntity)
  provider: ProviderEntity;
}
