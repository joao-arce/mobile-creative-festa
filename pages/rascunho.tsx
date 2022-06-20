import React from 'react';

const Rascunho = () => {
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

        {/* AQUI */}
        <div className="p-4 w-full bg-slate-200 rounded-lg">
          <h1 className="flex justify-between text-lg text-gray-600 font-bold mb-4 ">
            <p>Comanda</p>
            <p>022</p>
          </h1>

          <h2 className="font-medium title-font tracking-widest text-gray-900 mb-4 text-lg text-center">
            Pedido
          </h2>
          <div className="flex flex-col sm:items-start sm:text-left text-center items-center space-y-2.5">
            <div className="w-full flex justify-between">
              <p>First Link</p>
              <p>First Link</p>
            </div>
            <div className="w-full flex justify-between">
              <p>First Link</p>
              <p>First Link</p>
            </div>
            <div className="w-full flex justify-between">
              <p>First Link</p>
              <p>First Link</p>
            </div>
            <div className="w-full flex justify-center gap-16 pt-5 ">
              <button className="bg-teal-500 hover:bg-teal-700 text-white font-normal py-2 px-4 rounded">
                Atendido
              </button>
              <button className="bg-zinc-500 hover:bg-zinc-700 text-white font-normal py-2 px-4 rounded">
                Voltar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rascunho;
