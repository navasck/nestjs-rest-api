import { Injectable } from '@nestjs/common';

// Define the structure of a Product object
interface Product {
  id: number;
  name: string;
  price: number;
}

@Injectable()
export class ProductsService {
  // A simple array to simulate a database of products
  private products: Product[] = [
    { id: 1, name: 'Laptop', price: 1200 },
    { id: 2, name: 'Keyboard', price: 75 },
    { id: 3, name: 'Mouse', price: 40 },
  ];

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product | undefined {
    // Find a product by its ID. The `+` operator converts the string ID from the URL to a number.
    return this.products.find((product) => product.id === +id);
  }
}
