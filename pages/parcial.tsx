import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type Product = {
  name: string;
  price: number;
};

type Item = {
  quantity: number;
  product_name: string;
  product_price: number;
  total_item?: number;
};

type OrderData = {
  number: number;
  adult_qtd: number;
  kid_qtd: number;
  adult_price: number;
  kid_price: number;
  total_ticket: number;
};

const Parcial = () => {
  const [showParcial, setShowParcial] = useState(false);
  const [order, setOrder] = useState<OrderData>();
  const [items, setItems] = useState<Item[]>([]);
  let totalConsumo = 0;

  // const order: OrderData

  const router = useRouter();

  const buildPartialScreen = (order: any) => {
    buildPartialOrder(order);
    const auxItems = order.items;
    // console.log('auxItems ', auxItems);
    builPartialConsumo(auxItems);
  };

  const buildPartialOrder = (order: any) => {
    const { number, adult_qtd, kid_qtd } = order;
    const { adult_price, kid_price } = order.ticket;

    const total = +adult_qtd * +adult_price + +kid_price * +kid_qtd;

    const objOrder: OrderData = {
      number: number,
      adult_qtd: adult_qtd,
      kid_qtd: kid_qtd,
      adult_price: adult_price,
      kid_price: kid_price,
      total_ticket: total,
    };
    setOrder(objOrder);
  };

  const sumaryItem = (consumo: Item[]) => {};

  const builPartialConsumo = (items: any) => {
    const result = items.map((item: { quantity: any; product: any }) => {
      const objItem: Item = {
        quantity: item.quantity,
        product_name: item.product.name,
        product_price: item.product.price,
      };
      return objItem;
    });
    setItems(result);
    // console.log('Items aqui ', items);
  };

  const getOrder = () => {
    const { number } = router.query;
    const auxNumber = number === undefined ? 0 : +number;

    // console.log('auxNumber ', auxNumber);
    return auxNumber;
  };

  const loadParcial = async () => {
    const dateParam = new Date().toISOString().slice(0, 10);
    const auxNumber = getOrder();

    // console.log('Carregando parcial');
    // console.log('orderNumber ', auxNumber);
    // console.log('dateParam ', dateParam);

    // order/parcial/:number/:date
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/order/parcial/${auxNumber}/${dateParam}`
    );

    if (response.ok) {
      const list = await response.json();

      // console.log('Vamos ver ');
      // console.log('list ', list);

      const auxOrder = list.order;
      buildPartialScreen(auxOrder);
      const auxTicket = list.order.ticket;
      // console.log('auxOrder ', auxOrder);
      // console.log('auxItems ', auxItems);
      // console.log('auxTicket ', auxTicket);

      // setOpenList(list.orders);
      // setShowList(true);
    } else {
      console.log('Error', response.status);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  };

  useEffect(() => {
    // setShowParcial(false);
    loadParcial();
    setShowParcial(true);
  }, []);

  return (
    <div className="flex h-screen w-full justify-center items-center">
      <div className="min-h-[70%] h-screen w-full max-w-sm bg-white flex flex-col py-5 px-4 rounded-xl shadow-lg">
        {/* ****** */}
        {/* Cabeçalho  */}
        <h1 className="text-center text-2xl text-blue-700 font-bold mb-8 ">
          Creative Festas
        </h1>
        {/* Usuário logado */}
        <div className="p-2 w-full bg-gray-100 rounded-md mb-3">
          <div>
            <h2 className="text-gray-900 title-font font-medium">
              Silvio Santos
            </h2>
            <p className="text-gray-500">Garçom</p>
          </div>
        </div>

        {/* Dados da comanda */}

        <div className="p-2 w-full bg-gray-100 rounded-md mt-2">
          <div>
            <h2 className="text-gray-900 title-font font-medium">
              Comanda {order?.number}
            </h2>
            <div className="flex justify-between">
              <p className="text-gray-500">Rodízio Adulto {order?.adult_qtd}</p>
              <p className="text-gray-500">
                {order !== undefined
                  ? (order?.adult_price * order?.adult_qtd).toFixed(2)
                  : 0}{' '}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-500">Rodízio Criança {order?.kid_qtd} </p>
              <p className="text-gray-500">
                {order !== undefined
                  ? (order?.kid_price * order?.kid_qtd).toFixed(2)
                  : 0}{' '}
              </p>
            </div>
            <div className="flex justify-end">
              <h2 className="text-gray-900 title-font  font-medium">
                total R$ {order?.total_ticket?.toFixed(2)}
              </h2>
            </div>
          </div>
        </div>

        {/* Consumo */}

        <div className="p-2 w-full bg-gray-100 rounded-md mt-2">
          <div>
            <h2 className="text-gray-900 title-font text-center font-medium">
              Consumo
            </h2>
            {items.map((element, index) => {
              totalConsumo += element.product_price * element.quantity;
              return (
                <div key={index} className="flex justify-between">
                  <p className="text-gray-500">{element.product_name} </p>
                  <p className="text-gray-500">{element.quantity} </p>
                  <p className="text-gray-500">
                    {element.product_price.toFixed(2)}{' '}
                  </p>

                  <p className="text-gray-500 self-end">
                    {(element.product_price * element.quantity).toFixed(2)}{' '}
                  </p>
                </div>
              );
            })}
            <div className="flex justify-end">
              <h2 className="text-gray-900 title-font  font-medium">
                total R$ {totalConsumo.toFixed(2)}
              </h2>
            </div>
          </div>
        </div>

        {/* Total Geral da conta */}
        <div className="p-2 w-full bg-gray-100 rounded-md mb-3">
          <div className="flex justify-end">
            <h2 className="text-gray-900 title-font font-medium">
              R${' '}
              {(
                totalConsumo + (order !== undefined ? order?.total_ticket : 0)
              ).toFixed(2)}
            </h2>
          </div>
        </div>

        {/* Bottons */}
        <div className="w-full flex justify-center gap-14 pt-5 ">
          <button
            onClick={(e) => router.push('/')}
            className="bg-zinc-500 hover:bg-zinc-700 text-white font-normal py-2 px-4 rounded"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Parcial;
