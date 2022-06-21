import React from 'react';

const Rascunho = () => {
  return (
    <>
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

      <h1>tabela</h1>
      <div className="w-full mx-auto px-1 overflow-auto bg-gray-200 rounded-lg">
        <div className="text-center mt-2 mb-2">
          <h1 className="font-medium">Pedido</h1>
        </div>

        <table className="table-auto w-full text-left whitespace-no-wrap">
          <tbody>
            <tr>
              <td className="px-1 py-1">Choop</td>
              <td className="px-2 py-1">01</td>
              <td>
                <button className="rounded-3xl bg-red-700 text-white  w-8 text-3xl px-2">
                  -
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-center gap-8 my-3 pb-2">
          <button
            // onClick={handleClick}
            className="rounded-full bg-teal-700 text-white px-4 py-2"
          >
            Confirmar
          </button>
          <button className="rounded-full bg-gray-700 text-white px-4 py-2">
            Cancelar
          </button>
        </div>
      </div>

      {/* svg de teste */}
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          viewBox="0 0 20 20"
          fill="green"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        viewBox="0 0 20 20"
        fill="red"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
          clipRule="evenodd"
        />
      </svg>
    </>
  );
};

export default Rascunho;
