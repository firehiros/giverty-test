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

@Entity({ name: 'site_config' })
export default class MainEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  title: string;

  @Column()
  url: string;

  @Column()
  keyword: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar' })
  slogan: string;

  @Column({ type: 'text' })
  header_about: string;

  @Column({ type: 'text' })
  footer_about: string;

  @Column({ type: 'varchar', nullable: true })
  favicon: string;

  @Column({ type: 'varchar', nullable: true })
  logo: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  // Relation
  @OneToOne(() => ProviderEntity)
  @JoinColumn()
  provider: ProviderEntity;
}
