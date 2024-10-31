import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'recipes' })
export class RecipeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'title',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  title: string;

  @Column({
    name: 'making_time',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  making_time: string;

  @Column({
    name: 'serves',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  serves: string;

  @Column({
    name: 'ingredients',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  ingredients: string;

  @Column({
    name: 'cost',
    type: 'integer',
    length: 100,
    nullable: false,
  })
  cost: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
