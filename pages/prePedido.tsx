import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type OrderProps = {
  id: number;
  number: number;
  adult_qtd: number;
  kid_qtd: number;
};

const PrePedido = () => {
  const [order, setOrder] = useState<OrderProps>();
  const router = useRouter();

  const handlePedido = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const myOrder = JSON.stringify(order);
    // console.log('order vinda da busca ', myOrder);

    router.push({ pathname: '/pedido', query: { order: myOrder } });
    // router.push({ pathname: '/pedido' });
  };
  const handleParcial = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // const myOrder = JSON.stringify(order);
    const orderNumber = order?.number;
    router.push({ pathname: '/parcial', query: { number: orderNumber } });
  };

  const loadOrder = () => {
    const { order } = router.query;
    const orderAux = order !== undefined ? JSON.parse(order.toString()) : '';
    // console.log('orderAux ', orderAux);
    setOrder(orderAux);
  };

  useEffect(() => {
    loadOrder();
  }, []);

  return (
    <div className="flex h-screen w-full justify-center items-center">
      <div className="min-h-[70%] h-screen w-full max-w-sm bg-white flex flex-col py-5 px-4 rounded-xl shadow-lg">
        <h1 className="text-center text-2xl text-blue-700 font-bold mb-8 ">
          Creative Festas
        </h1>

        {/* dados do usuário logado */}
        <div className="p-2 w-full bg-gray-100 rounded-md ">
          <div>
            <h2 className="text-gray-900 title-font font-medium">
              Silvio Santos
            </h2>
            <p className="text-gray-500">Garçom</p>
          </div>
        </div>
        {/* dados da comanda  */}
        <div className="p-2 w-full bg-gray-100 rounded-md mt-2">
          <div>
            <h2 className="text-gray-900 title-font font-medium">
              Comanda {order?.number}
            </h2>
            <p className="text-gray-500">Rodízio Adulto {order?.adult_qtd}</p>
            <p className="text-gray-500">Rodízio Criança {order?.kid_qtd}</p>
          </div>
        </div>
        {/* buttons  */}
        <div className="flex justify-around items-center my-4">
          <button
            onClick={handlePedido}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-4"
          >
            Lançar Pedido
          </button>
          <button
            onClick={handleParcial}
            className="bg-purple-500 hover:bg-purple-800 text-white font-bold rounded py-2 px-4"
          >
            Parcial
          </button>
        </div>
        <button
          onClick={(e) => router.back()}
          className="bg-gray-500 hover:bg-gray-800 text-white font-bold rounded py-2 px-4"
        >
          Voltar
        </button>
      </div>
    </div>
  );
};

export default PrePedido;
