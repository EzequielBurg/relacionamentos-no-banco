import { getRepository, Repository } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateProductsQuantityDTO';
import Product from '../entities/Product';

interface IFindProducts {
  id: string;
}

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({
      name,
      price,
      quantity,
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return product;
  }

  public async findAllById(products: IFindProducts[]): Promise<Product[]> {
    const productsByIds = await this.ormRepository.findByIds(products);

    return productsByIds;
  }

  public async updateQuantity(
    products: IUpdateProductsQuantityDTO[],
  ): Promise<Product[]> {
    // const productsIds = products.map(item => item.id);

    // const findProductsByIds = await this.ormRepository.findByIds(productsIds);

    // findProductsByIds.map(item => {
    //   const product = item;
    //   const index = productsIds.indexOf(item.id);
    //   if (index) {
    //     product.quantity = products[index].quantity;
    //   }
    //   return product;
    // });

    // return findProductsByIds;

    return this.ormRepository.save(products);
  }
}

export default ProductsRepository;
