import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Parcial = () => {
  const [showParcial, setShowParcial] = useState(true);
  const [idOrder, setIdOrder] = useState(0);
  const [orderNumber, setOrderNumber] = useState(0);

  const router = useRouter();

  const buildOrderData = () => {
    return (
      <div className="p-2 w-full bg-gray-100 rounded-md mt-2">
        <div>
          <h2 className="text-gray-900 title-font font-medium">Comanda 00</h2>
          <p className="text-gray-500">Rodízio Adulto </p>
          <p className="text-gray-500">Rodízio Criança </p>
        </div>
      </div>
    );
  };

  const getOrder = () => {
    const { order } = router.query;
    const myOrder = order !== undefined ? JSON.parse(order?.toString()) : {};

    console.log('order ', order);
    setIdOrder(myOrder.id);
    setOrderNumber(myOrder.number);
  };

  const loadParcial = async () => {
    console.log('Carregando parcial');
    const dateParam = new Date().toISOString().slice(0, 10);
    // order/parcial/:number/:date
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/order/parcial/${orderNumber}/${dateParam}`
    );

    if (response.ok) {
      const list = await response.json();

      console.log('list ', list);

      // setOpenList(list.orders);
      // setShowList(true);
    } else {
      console.log('Error', response.status);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  };

  useEffect(() => {
    setShowParcial(false);
    getOrder();
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
            <h2 className="text-gray-900 title-font font-medium">Comanda 00</h2>
            <p className="text-gray-500">Rodízio Adulto </p>
            <p className="text-gray-500">Rodízio Criança </p>
          </div>
        </div>

        {/* Consumo */}

        <div className="p-2 w-full bg-gray-100 rounded-md mt-2">
          <div>
            <h2 className="text-gray-900 title-font text-center font-medium">
              Consumo
            </h2>
            <p className="text-gray-500">Rodízio Adulto </p>
            <p className="text-gray-500">Rodízio Criança </p>
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
