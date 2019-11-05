import { Field, InputType } from 'type-graphql';
import { Length } from 'class-validator';

import { Product } from '../../../entities/Product';

@InputType()
export class UpdateProductInput implements Partial<Product> {
  @Field()
  id!: number;

  @Field()
  @Length(1, 200)
  name!: string;

  @Field()
  @Length(1, 50)
  category!: string;

  @Field()
  price!: number;

  @Field()
  quantity!: number;

  @Field({ nullable: true })
  imagePath?: string;

  @Field()
  isActive!: boolean;
}
