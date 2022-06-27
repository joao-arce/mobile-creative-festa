import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { saveItems } from '../libs/item';

import { IItem, INewItem } from '../types/item';

type ItemOrderProps = {
  items: IItem[];
  idOrder: number;
};

const ItemOrder = ({ items, idOrder }: ItemOrderProps) => {
  const [itemsProduct, setItemsProduct] = useState<IItem[]>(items);
  const router = useRouter();

  const loadItems = () => {
    setItemsProduct(items);
  };

  const removeItem = (id: number) => {
    const itemFilterd = itemsProduct.filter((item) => item.id !== id);
    console.log('length ', itemFilterd.length);
    if (itemFilterd.length === 0) router.back();
    setItemsProduct(itemFilterd);
  };

  const handleUpdateQuantity = (
    e: React.SyntheticEvent,
    itemProduct: IItem,
    action: 'plus' | 'minus'
  ) => {
    e.preventDefault();

    let newQuantity = itemProduct.quantity;
    if (action === 'plus') {
      newQuantity = newQuantity + 1;
    } else {
      if (itemProduct.quantity === 1) {
        removeItem(itemProduct.id === undefined ? 0 : itemProduct.id);
        return;
      } else {
        newQuantity = itemProduct.quantity - 1;
      }
    }

    const updateItems = itemsProduct.map((item) =>
      item.id === itemProduct.id ? { ...item, quantity: newQuantity } : item
    );

    setItemsProduct(updateItems);
  };

  const formatItemsToSend = () => {
    // console.log('formatItemsToSend ', idOrder);

    const itemsTemp = itemsProduct.map((item) => {
      const newItem: INewItem = {
        id_order: idOrder,
        id_product: item.id_product,
        id_user: item.id_user,
        service_time: item.service_time,
        quantity: item.quantity,
        status: item.status,
      };

      return newItem;
    });

    return itemsTemp;
  };

  const handleSaveItems = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const newsItems = formatItemsToSend();
    const response = await saveItems(newsItems);
    const result = await response.json();
    router.back();

    // console.log('Vamos gravar');
    // console.log('newsItems ', newsItems);
    // return;
  };

  const loadOrder = () => (
    <div className="w-full mx-auto px-2 py-4">
      <div>
        {itemsProduct?.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-4 justify-between items-center"
          >
            <p className="col-span-2">{item.product.name}</p>
            <p className="text-center">{item.quantity}</p>
            <div className="flex justify-center items-center pr-4">
              <button onClick={(e) => handleUpdateQuantity(e, item, 'minus')}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  viewBox="0 0 20 20"
                  fill="red"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                onClick={(e) => handleUpdateQuantity(e, item, 'plus')}
                className="px-0 py-1  text-gray-100 bg-emerald-600 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-10"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}

        {itemsProduct.length > 0 && (
          <div className="flex justify-center gap-8 my-3 pb-2">
            <button
              onClick={handleSaveItems}
              className="rounded-full bg-teal-700 text-white px-4 py-2"
            >
              Confirmar
            </button>
            <button
              onClick={(e) => router.back()}
              className="rounded-full bg-gray-700 text-white px-4 py-2"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
    </div>
  );

  useEffect(() => {
    loadItems();
  }, [items]);

  return loadOrder();
};

export default ItemOrder;
