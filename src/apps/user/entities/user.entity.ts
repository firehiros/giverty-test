import { Exclude } from 'class-transformer';
import { Gender } from '../../../utils/enum';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'email',
    type: 'varchar',
    unique: true,
  })
  email: string;

  @Column({
    name: 'password',
    type: 'varchar',
  })
  @Exclude()
  password: string;

  @Column({
    name: 'first_name',
    type: 'varchar',
    nullable: true,
  })
  firstName: string;

  @Column({
    name: 'last_name',
    type: 'varchar',
    nullable: true,
  })
  lastName: string;

  @Column({
    name: 'date_of_birth',
    nullable: true,
  })
  dateOfBirth: Date;

  @Column({
    name: 'gender',
    type: 'enum',
    enum: Gender,
    nullable: true,
  })
  gender: Gender;

  @Column({
    name: 'country',
    type: 'varchar',
    nullable: true,
  })
  country: string;

  @Column({
    name: 'region',
    type: 'varchar',
    nullable: true,
  })
  region: string;

  @Column({
    name: 'city',
    type: 'varchar',
    nullable: true,
  })
  city: string;

  @Column({
    name: 'district',
    type: 'varchar',
    nullable: true,
  })
  district: string;

  @Column({
    name: 'street',
    type: 'varchar',
    nullable: true,
  })
  address: string;

  @Column({
    name: 'postcode',
    type: 'varchar',
    nullable: true,
  })
  postcode: string;

  @Column({
    name: 'phone_code',
    type: 'varchar',
    nullable: true,
  })
  phoneCode: string;

  @Column({
    name: 'phone_number',
    type: 'varchar',
    nullable: true,
  })
  phoneNumber: string;

  @Column({
    name: 'apartment',
    type: 'varchar',
    nullable: true,
  })
  apartment: string;

  @Column({
    name: 'street_no',
    type: 'varchar',
    nullable: true,
  })
  streetNo: string;

  @Column({
    name: 'is_verified',
    type: 'boolean',
    default: false,
  })
  isVerified: boolean;

  @Column({
    name: 'expired_time',
    type: 'bigint',
    nullable: true,
  })
  expiredTime: number;

  @Column({
    name: 'is_2fa_enabled',
    type: 'boolean',
    default: false,
  })
  is2FAEnabled: boolean;

  @Column({
    name: 'fa_secret',
    type: 'varchar',
    nullable: true,
  })
  faSecret: string;

  @Column({
    name: 'is_reset_password',
    type: 'boolean',
    default: false,
  })
  isResetPassword: boolean;

  @Column({
    name: 'is_account_init',
    type: 'boolean',
    default: false,
  })
  isAccountInit: boolean;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
