import { Field, InputType } from 'type-graphql';
import { Length } from 'class-validator';

import { Product } from '../../../entities/Product';
// import { File } from '../../../types/File';

@InputType()
export class ProductCreateInput implements Partial<Product> {
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
  imagePath!: string;

  // @Field()
  // image?: File;

  @Field()
  isActive!: boolean;
}
