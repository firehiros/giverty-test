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

@Entity({ name: 'testimonial' })
export default class MainEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  person_name: string;

  @Column({ type: 'text' })
  person_photo: string;

  @Column({ type: 'text' })
  person_title: string;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  // Relation
  @ManyToOne(() => ProviderEntity)
  provider: ProviderEntity;

  // @OneToMany(() => PhotoEntity, (photo) => photo.service)
  // photos: PhotoEntity[];
}
