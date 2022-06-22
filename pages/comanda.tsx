import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

type OrderProps = {
  id: number;
  number: number;
  client_name: string;
  date: string;
  adult_qtd: number;
  kid_qtd: number;
  status: string;
  id_ticket: number;
};

// Ao carregar a tela deve consultar se o garçom
// tem comandas abertas. Caso sim, exiber as comandas
// para serem fechadas

const Comanda = () => {
  const [comanda, setComanda] = useState('');
  const [openList, setOpenList] = useState<OrderProps[]>([]);
  const [items, setItems] = useState([]);
  const [goToItems, setGoToItems] = useState(false);
  const [showList, setShowList] = useState(false);
  const [showErro, setShowErro] = useState(false);
  const [message, setMessage] = useState('');

  // const [isOpenOrder, setIsOpenOrder] = useState(false);
  const [isOpenOrder, setIsOpenOrder] = useState(true);
  const router = useRouter();

  const formateDateToSend = (date: string) => {
    const [day, month, year] = date.split('-');

    const result = [year, month, day].join('-');
    return result;
  };

  const handleListItems = async (
    e: React.FormEvent<HTMLButtonElement>,
    id_order: number
  ) => {
    e.preventDefault();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/item/${id_order}`
    );

    if (response.ok) {
      const items = await response.json();
      console.log('items ', items.items);

      setItems(items);
      setGoToItems(true);

      let aux = JSON.stringify(items);

      console.log('COMANDA ');
      console.log(aux);

      aux = aux.slice(9, aux.length - 1);

      router.push({ pathname: '/andamentoPedido', query: { items: aux } });
    } else {
      console.log('Error', response.status);
    }
  };

  const listOpenOrder = async () => {
    // const dateParam = formateDateToSend('12-06-2022');
    const dateParam = new Date().toISOString().slice(0, 10);
    // const ABERTA = 'aberta';
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/orderwithopenitems/${dateParam}`
    );

    if (response.ok) {
      const list = await response.json();

      // console.log('list ', list);

      setOpenList(list.orders);
      setShowList(true);
    } else {
      console.log('Error', response.status);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  };

  const validation = () => {
    if (+comanda === 0 || comanda.length === 0) {
      return false;
    }

    return true;
  };

  const handleSearchOrder = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (validation()) {
      // const dateParam = formateDateToSend('12-06-2022');
      const dateParam = new Date().toISOString().slice(0, 10);

      const FECHADA = 'fechada';
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/notclosed/${FECHADA}/${comanda}/${dateParam}`;

      // order/notclosed/:status/:number/:date
      const response = await fetch(`${url}`);

      if (response.ok) {
        const order = await response.json();
        console.log('order ', order.order);
        if (!order.order) {
          console.log('Não Encontrou, exibir msg ');
          setShowErro(true);
          setMessage('Comanda não encontrada.');
          return;
        }

        let aux = JSON.stringify(order);

        aux = aux.slice(9, aux.length - 1);

        router.push({ pathname: '/prePedido', query: { order: aux } });
      } else {
        console.log('Error', response.status);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setShowErro(false);
    } else {
      setShowErro(true);
      setMessage('Informe o número da comanda');
    }
  };

  const getOpenOrder = () => {
    // buscar comandas que possuem pedidos abertos
    listOpenOrder();
    setIsOpenOrder(true);
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
    // <div className=" bg-indigo-200 flex h-screen w-full flex-col justify-start items-center">
    <div className="flex h-screen w-full justify-center items-center">
      <form className="min-h-[70%] h-screen w-full max-w-sm bg-white flex flex-col py-5 px-4 rounded-xl shadow-lg">
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
          className="text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-2 px-3 mb-3 ml-2"
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

// const router = useRouter();

// const handleClick = () => {
//   router.push('/pedidoPage');
// };

// <div className="container bg-gray-100 rounded-xl px-5 py-10">
//       <h2 className="font-bold">James</h2>
//       <label className="label">
//         <span className="label-text">Comanda</span>
//       </label>
//       <input
//         type="text"
//         placeholder="Número"
//         className="input input-bordered input-primary max-w-[50%]"
//       />
//       <button
//         onClick={handleClick}
//         className="btn btn-primary rounded-full ml-5"
//       >
//         Buscar
//       </button>
//     </div>
