import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

// Ao carregar a tela deve consultar se o garçom
// tem comandas abertas. Caso sim, exiber as comandas
// para serem fechadas

const Comanda = () => {
  const [comanda, setComanda] = useState('');
  const [isOpenOrder, setIsOpenOrder] = useState(false);
  const router = useRouter();

  const validation = () => {
    if (+comanda === 0 || comanda.length === 0) {
      console.log('comanda não pode ser 0 ou vazia');
      return false;
    }

    return true;
  };

  const handleClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (validation()) {
      // BUSCAR A COMANDA NO BANCO DE DADOS
    } else {
      console.log('validação nao passou');
      return;
    }

    // A linha abaixo é para testar o funcionamento deve ser retirada
    setIsOpenOrder(true);
    // router.push('/comandaPedido');
  };

  const getOpenOrder = () => {
    // buscar comandas que possuem pedidos abertos
    // pensar quais são os parametros necessários para a consulta

    setIsOpenOrder(true);
  };

  const buildOpenOrder = () => {
    return (
      <div className="p-2 my-1 w-full bg-gray-100 rounded-md ">
        <div>
          <h2 className="text-gray-900 title-font font-medium text-center mb-4">
            Pedidos Abertos
          </h2>

          <div className="grid grid-cols-3 gap-x-2 gap-y-2">
            <Link href="/comandaAtendido">
              <a className="text-gray-50 font-semibold text-center bg-red-400 hover:bg-red-600 p-y-1 rounded-xl">
                123
              </a>
            </Link>
            <Link href="/comandaAtendido">
              <a className="text-gray-50 font-semibold text-center bg-red-400 hover:bg-red-600 p-y-1 rounded-xl">
                980
              </a>
            </Link>
            <Link href="/comandaAtendido">
              <a className="text-gray-50 font-semibold text-center bg-red-400 hover:bg-red-600 p-y-1 rounded-xl">
                058
              </a>
            </Link>
            <Link href="/comandaAtendido">
              <a className="text-gray-50 font-semibold text-center bg-red-400 hover:bg-red-600 p-y-1 rounded-xl">
                144
              </a>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    getOpenOrder();
  }, []);

  return (
    <div className=" bg-indigo-200 flex h-screen flex-col gap-2 justify-center items-center">
      <form className="min-h-[70%] w-full max-w-xs bg-white flex flex-col justify-center py-5 px-8 rounded-xl shadow-lg">
        <h1 className="text-center text-2xl text-blue-700 font-bold mb-8 ">
          Creative Festas
        </h1>

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
          className="text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-3 ml-2"
          type="text"
          value={comanda}
          onChange={(e) => setComanda(e.target.value.replace(/\D/g, ''))}
          placeholder="Número da comanda"
        />

        <div className="flex justify-around items-center my-4">
          <button
            onClick={handleClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-4"
          >
            Buscar
          </button>
          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold rounded py-2 px-4">
            Log Out
          </button>
        </div>

        {/* Comandas abertas */}
        {isOpenOrder ? buildOpenOrder() : ''}
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
