import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export enum FileTypes {
  IMAGE = 'image',
  DOCUMENT = 'document',
  VIDEO = 'video',
}

@Entity({ name: 'photos' })
export default class MainEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: FileTypes,
    default: FileTypes.IMAGE,
  })
  type: string;

  @Column({ type: 'varchar', length: 255 })
  url: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  tags: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  // @ManyToOne(() => ServiceEntity, (service) => service.photos)
  //   service: ServiceEntity
}
