import { Resolver, UseMiddleware, Arg, Query, Mutation, Ctx } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { isAuthenticated } from '../middleware/isAuthenticated';
import { Product } from '../../entities/Product';
import { ProductRepository } from '../../repositories/ProductRepository';
import { Context } from '../../types/Context';
import { ProductCreateInput } from './types/ProductCreateInput';
import { ProductUpdateInput } from './types/ProductUpdateInput';

@Resolver(Product)
export class ProductResolver {
  constructor(@InjectRepository(ProductRepository) private readonly productRepository: ProductRepository) {}

  @Query(() => [Product])
  @UseMiddleware(isAuthenticated)
  async getProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  @Query(() => Product, { nullable: true })
  @UseMiddleware(isAuthenticated)
  async getProductById(@Arg('id') id: number): Promise<Product | null> {
    const data = await this.productRepository.findOne(id);

    if (!data && data === undefined) {
      return null;
    }

    return data;
  }

  @Query(() => [Product])
  @UseMiddleware(isAuthenticated)
  async getProductByName(@Arg('name') name: string): Promise<Product[]> {
    return await this.productRepository.findByName(name);
  }

  @Query(() => [Product])
  @UseMiddleware(isAuthenticated)
  async getProductsWithStatusActive(): Promise<Product[]> {
    const data = await this.productRepository.findAllWithStatusActive();

    if (!data && data === undefined) {
      return [];
    }

    return data;
  }

  @Mutation(() => Product)
  @UseMiddleware(isAuthenticated)
  async createProduct(@Arg('data') input: ProductCreateInput, @Ctx() ctx: Context): Promise<Product> {
    const product = this.productRepository.create({
      ...input,
      createdBy: ctx.req.session && ctx.req.session.userId,
    });

    if (!product) {
      throw new Error('Someone already added same product');
    }

    return await this.productRepository.save(product);
  }

  @Mutation(() => Product)
  @UseMiddleware(isAuthenticated)
  async updateProduct(@Arg('data') input: ProductUpdateInput): Promise<Product | null> {
    let product;

    try {
      product = await this.productRepository.findOne(input.id);

      if (!product) {
        throw new Error('Data not found!');
      }

      await this.productRepository.update(input.id, input);

      product = await this.productRepository.findOne(input.id);

      if (!product && product === undefined) {
        return null;
      }
    } catch (err) {
      throw new Error(err);
    }

    return product;
  }

  @Mutation(() => Product)
  @UseMiddleware(isAuthenticated)
  async deleteProduct(@Arg('id') id: number): Promise<Product | null> {
    let product;

    try {
      product = await this.productRepository.findOne(id);

      if (!product) {
        throw new Error('Data not found!');
      }

      await this.productRepository.delete(id);
    } catch (err) {
      throw new Error(err);
    }

    return product;
  }
}
