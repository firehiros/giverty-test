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
    type: 'varchar'
  })
  title: string;

  @Column({
    name: 'making_time',
    type: 'varchar'
  })
  making_time: string;

  @Column({
    name: 'serves',
    type: 'varchar'
  })
  serves: string;

  @Column({
    name: 'ingredients',
    type: 'varchar'
  })
  ingredients: string;

  @Column({
    name: 'cost',
    type: 'integer'
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
