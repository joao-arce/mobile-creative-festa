import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import { IOrder } from '../types/order';
import { listOpenOrder, searchOrder } from '../libs/order';
import { listItems } from '../libs/item';

// Ao carregar a tela deve consultar se o garçom
// tem comandas abertas. Caso sim, exiber as comandas
// para serem fechadas

const Comanda = () => {
  const [comanda, setComanda] = useState('');
  const [openList, setOpenList] = useState<IOrder[]>([]);
  const [showList, setShowList] = useState(false);
  const [showErro, setShowErro] = useState(false);
  const [message, setMessage] = useState('');

  const router = useRouter();

  const handleListItems = async (e: React.SyntheticEvent, id_order: number) => {
    e.preventDefault();

    const items = await listItems(id_order);

    // setItems(items);
    // setGoToItems(true);

    let aux = JSON.stringify(items);

    aux = aux.slice(9, aux.length - 1);

    router.push({ pathname: '/andamentoPedido', query: { items: aux } });
  };

  const listOpenOrderOld = async () => {
    const orders = await listOpenOrder();

    // console.log('orders open ', orders);

    setOpenList(orders);
    setShowList(true);
  };

  const validation = () => {
    if (+comanda === 0 || comanda.length === 0) {
      return false;
    }

    return true;
  };

  const handleSearchOrder = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (validation()) {
      const response = await searchOrder(parseInt(comanda));
      const order = response.order;

      if (order !== null) {
        const aux = JSON.stringify(order);
        router.push({ pathname: '/prePedido', query: { order: aux } });
      } else {
        setShowErro(true);
        setMessage('Comanda não encontrada.');
        return;
      }

      setShowErro(false);
    } else {
      setShowErro(true);
      setMessage('Informe o número da comanda');
    }
  };

  const getOpenOrder = () => {
    // buscar comandas que possuem pedidos abertos
    listOpenOrderOld();
  };

  const buildOpenOrder = () => {
    return (
      <div className="p-2 my-1 w-full bg-gray-100 rounded-md ">
        <div>
          <h2 className="text-gray-900 title-font font-medium text-center mb-4">
            Pedidos Abertos
          </h2>

          {/* href="/comandaAtendido" */}
          <div className="grid grid-cols-3 gap-x-2 gap-y-2">
            {openList.map((order) => (
              <button
                onClick={(e) => handleListItems(e, order.id)}
                key={order.id}
                className="text-gray-50 font-semibold text-center bg-red-400 hover:bg-red-600 py-1 rounded-xl"
              >
                {order.number}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    getOpenOrder();
  }, []);

  return (
    <div className="flex h-screen w-full justify-center items-center">
      <form className="min-h-[70%] h-screen w-full max-w-md bg-white flex flex-col py-5 px-4 rounded-xl shadow-lg">
        <h1 className="text-center text-2xl text-blue-700 font-bold mb-8 ">
          Creative Festas
        </h1>
        {showErro && (
          <div className="bg-red-400 mb-5 rounded-lg">
            <div className="text-slate-50 p-3 font-medium">{message}</div>
          </div>
        )}

        {/* dados do usuário logado */}
        <div className="p-2 w-full bg-gray-100 rounded-md ">
          <div>
            {/* Pegar o nome da context api */}
            <h2 className="text-gray-900 title-font font-medium">
              Silvio Santos
            </h2>
            {/* Pegar o job Title da context api */}
            <p className="text-gray-500">Garçom</p>
          </div>
        </div>

        <label className="text-gray-700 font-medium px-2 mt-5" htmlFor="">
          Comanda
        </label>
        <input
          className="text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-3 px-3 mb-3 ml-2"
          type="text"
          value={comanda}
          onChange={(e) => setComanda(e.target.value.replace(/\D/g, ''))}
          placeholder="Número da comanda"
        />

        <div className="flex justify-around items-center my-4">
          <button
            onClick={handleSearchOrder}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-4"
          >
            Buscar
          </button>
          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold rounded py-2 px-4">
            Log Out
          </button>
        </div>

        {/* Comandas abertas */}
        {showList ? buildOpenOrder() : ''}
      </form>
    </div>
  );
};

export default Comanda;
