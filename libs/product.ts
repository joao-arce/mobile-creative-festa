import { IProduct } from '../types/product';

export const loadProducts = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/product`);

  const empty: IProduct[] = [];
  if (response.ok) {
    const list = await response.json();
    const result = list.products;
    return result;
  } else {
    console.log('Error', response.status);
  }
  return empty;
};
