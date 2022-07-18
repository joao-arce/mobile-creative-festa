import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { IItem } from '../types/item';
import { IProduct } from '../types/product';

import { loadProducts } from '../libs/product';

import Product from '../components/product';
import ItemOrder from '../components/itemOrder';

type Props = {
  products: IProduct[];
};

const Pedido = ({ products }: Props) => {
  const [itemsProduct, setItemsProduct] = useState<IItem[]>([]);
  const [idOrder, setIdOrder] = useState(0);
  const [orderNumber, setOrderNumber] = useState(0);

  const router = useRouter();

  const wrapperGetOrder = async () => {
    await getOrder();
  };

  const getOrder = async () => {
    const { order } = router.query;
    const myOrder =
      order !== undefined ? await JSON.parse(order?.toString()) : {};

    // console.log('myOrder ', myOrder);
    setIdOrder(myOrder.id);
    setOrderNumber(myOrder.number);
  };

  const prepareItemOrder = (product: IProduct, quantity: number) => {
    // Antes de enviar para o BD
    const date = new Date();
    const hour = date.getHours() + ':' + date.getMinutes();
    const idTemp = Math.random();

    const itemTemp: IItem = {
      id: idTemp,
      service_time: hour,
      quantity: quantity,
      status: 'aberto',
      id_product: product.id,
      id_order: idOrder,
      id_user: 1,
      product: product,
    };
    setItemsProduct((prev) => [...prev, itemTemp]);
    return;
  };

  const handleAddItem = (product: IProduct) => {
    prepareItemOrder(product, 1);
  };

  useEffect(() => {
    wrapperGetOrder();
  }, []);

  return (
    <div className="flex h-screen w-full justify-center items-center">
      <div className="min-h-[70%] h-screen w-full max-w-sm bg-white flex flex-col py-5 px-4 rounded-xl shadow-lg">
        <h1 className="text-center text-2xl text-blue-700 font-bold mb-6 ">
          Creative Festas
        </h1>
        {/* dados da comanda  */}
        <div className="p-2 w-full bg-gray-100 rounded-md my-2">
          <div className="flex text-gray-900 title-font font-medium">
            <h2 className="basis-1/2">Comanda</h2>
            <h2>{orderNumber}</h2>
          </div>
        </div>

        {/* dados do pedido */}
        <ItemOrder items={itemsProduct} idOrder={idOrder} />

        {/* tabela com produtos */}
        <div className="pb-3 mt-2">
          <Product products={products} type="CERVEJA" addItem={handleAddItem} />
        </div>
        <div className="pb-3">
          <Product
            products={products}
            type="REFRIGERANTES"
            addItem={handleAddItem}
          />
        </div>
        <div className="pb-3">
          <Product products={products} type="SUCOS" addItem={handleAddItem} />
        </div>

        <button
          onClick={(e) => router.back()}
          className="bg-gray-500 hover:bg-gray-800 text-white rounded py-2 px-4"
        >
          Voltar
        </button>
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const products = await loadProducts();
  return {
    props: {
      products,
    },
  };
};

export default Pedido;
