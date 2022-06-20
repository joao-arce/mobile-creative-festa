import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

type Product = {
  name: string;
};
type Order = {
  number: number;
};
type ItemOrder = {
  id: number;
  id_order: number;
  quantity: number;
  status: string;
  product: Product;
  order: Order;
};

const AndamentoPedido = () => {
  const [itemsOrder, setItemsOrder] = useState<ItemOrder[]>([]);
  const [orderNumber, setOrderNumber] = useState(0);
  const [showItems, setShowItems] = useState(true);

  const router = useRouter();

  const loadItemsOrder = async () => {
    const { items } = router.query;
    const itemsAux: ItemOrder[] =
      items !== undefined ? await JSON.parse(items.toString()) : [];
    // console.log('andamento ', itemsAux);
    if (itemsAux.length > 0) setOrderNumber(itemsAux[0].order.number);
    setItemsOrder(itemsAux);
  };

  const handleAttend = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const id_order = itemsOrder[0].id_order;
    const newStatus = {
      status: 'atendido',
    };

    const response = await fetch(
      // item/updateMany
      `${process.env.NEXT_PUBLIC_BASE_URL}/item/updateMany/${id_order}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(newStatus),
      }
    );

    if (response.ok) {
      const order = await response.json();
      // console.log('tudo ok');
      // props.closeFechamento();
      router.push('/');
    } else {
      console.log('Erro ', await response.json());
    }
  };

  useEffect(() => {
    setShowItems(false);
    loadItemsOrder();
    setShowItems(true);
  }, []);

  return (
    <div className="flex h-screen w-full justify-center items-center">
      <div className="min-h-[70%] h-screen w-full max-w-sm bg-white flex flex-col py-5 px-4 rounded-xl shadow-lg">
        {/* ****** */}

        <h1 className="text-center text-2xl text-blue-700 font-bold mb-8 ">
          Creative Festas
        </h1>

        <div className="p-2 w-full bg-gray-100 rounded-md mb-3">
          <div>
            <h2 className="text-gray-900 title-font font-medium">
              Silvio Santos
            </h2>
            <p className="text-gray-500">Garçom</p>
          </div>
        </div>

        {/* Lista de itens do pedido */}
        <div className="p-4 w-full bg-gray-200 rounded-lg">
          <h1 className="flex text-lg gap-8 text-gray-600 font-normal mb-4 ">
            <p>Comanda</p>
            <p>{orderNumber}</p>
          </h1>

          <h2 className="font-medium title-font tracking-widest text-gray-900 mb-4 text-lg text-center">
            Pedido
          </h2>
          <div className="flex flex-col sm:items-start sm:text-left text-center items-center">
            {showItems &&
              itemsOrder.map((item) => (
                <div key={item.id} className="w-full flex justify-between">
                  <p>{item.product.name}</p>
                  <p>{item.quantity}</p>
                </div>
              ))}
          </div>

          {/* buttons */}
          <div className="w-full flex justify-center gap-14 pt-5 ">
            <button
              onClick={handleAttend}
              className="bg-teal-500 hover:bg-teal-700 text-white font-normal py-2 px-4 rounded"
            >
              Atendido
            </button>
            <button
              onClick={(e) => router.push('/')}
              className="bg-zinc-500 hover:bg-zinc-700 text-white font-normal py-2 px-4 rounded"
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AndamentoPedido;
