import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

@Entity()
@ObjectType()
export class Product extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Field()
  @Column({ length: 200, unique: true })
  name!: string;

  @Field()
  @Column({ length: 50 })
  category!: string;

  @Field()
  @Column({ type: 'decimal', default: 0 })
  price!: number;

  @Field()
  @Column({ default: 0 })
  quantity!: number;

  @Field({ nullable: true })
  @Column({ name: 'image_path', nullable: true })
  imagePath!: string;

  @Field()
  @Column({ name: 'is_active', default: true })
  isActive!: boolean;

  @Field()
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @Field()
  @Column({ name: 'created_by' })
  createdBy!: string;
}
