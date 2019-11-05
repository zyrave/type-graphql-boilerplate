import { Repository, EntityRepository, getRepository } from 'typeorm';

import { Product } from '../entities/Product';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  findByName = async (name: string): Promise<Product[]> => {
    const data = await getRepository(Product)
      .createQueryBuilder('product')
      .where('product.name like :name', { name: '%' + name + '%' })
      .getMany();

    return data;
  };

  findAllWithStatusActive = async (): Promise<Product[]> => {
    const data = await getRepository(Product).query(
      'SELECT id, name, category, price, quantity, image_path AS "imagePath", is_active AS "isActive", created_at AS "createdAt", updated_at AS "updatedAt", created_by AS "createdBy" FROM product WHERE is_active = true',
    );

    return data;
  };
}
