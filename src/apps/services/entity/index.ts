import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

import ProviderEntity from '../../providers/entity/provider.entity';
import PhotoEntity from '../../photos/entity';

export enum ServiceTypes {
  HIKING = 'hiking',
  RUNNING = 'running',
}

@Entity({ name: 'services' })
export default class MainEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: ServiceTypes,
    default: ServiceTypes.HIKING,
  })
  type: string;

  @Column({ type: 'text' })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  // Relation

  @ManyToOne(() => ProviderEntity)
  provider: ProviderEntity;

  @OneToMany(() => PhotoEntity, (photo) => photo.service)
  photos: PhotoEntity[];
}
