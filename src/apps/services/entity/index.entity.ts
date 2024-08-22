import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
} from 'typeorm';

import ProviderEntity from '../../providers/entity/provider.entity';

@Entity({ name: 'services' })
export default class ServiceEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  key: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  sub_title: string;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ nullable: true })
  tag: string;

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
