import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// const products = [
//   { id: 1, name: 'Choop', price: 2.0 },
//   { id: 2, name: 'Heineken Lata', price: 4.0 },
//   { id: 3, name: 'Amstel Lata', price: 4.0 },
//   { id: 4, name: 'Antártica Lata', price: 4.0 },
// ];

type Product = {
  id: number;
  name: string;
  price: number;
};

const Pedido = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  const loadProduct = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/product`);

    if (response.ok) {
      const list = await response.json();
      console.log('products ', list);
      setProducts(list.products);
    } else {
      console.log('Error', response.status);
    }
  };

  const handleAddItem = () => {
    console.log('chegou aqui');
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    router.push('/comandaFesta');
  };

  const productsRow = (): string => {
    return '';
  };

  useEffect(() => {
    loadProduct();
  }, []);

  return (
    // <div className="h-screen bg-indigo-200 flex justify-center items-center">
    // {/* <div className="min-h-[70%] w-full max-w-xs bg-white flex flex-col justify-center py-5 px-1 rounded-xl shadow-lg"> */}
    <div className="flex h-screen w-full justify-center items-center">
      <div className="min-h-[70%] h-screen w-full max-w-sm bg-white flex flex-col py-5 px-4 rounded-xl shadow-lg">
        <h1 className="text-center text-2xl text-blue-700 font-bold mb-6 ">
          Creative Festas
        </h1>
        {/* dados da comanda  */}
        <div className="p-2 w-full bg-gray-100 rounded-md my-2">
          <div>
            <h2 className="text-gray-900 title-font font-medium">
              Comanda 123
            </h2>
          </div>
        </div>
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
              <tr>
                <td className="px-1 py-1">Heineken Lata</td>
                <td className="px-2 py-1">05</td>
                <td>
                  <button className="rounded-full bg-red-700 text-white text-3xl px-2">
                    -
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-1 py-1">Água c/ gás</td>
                <td className="px-2 py-1">01</td>
                <td>
                  <button className="rounded-full bg-red-700 text-white text-3xl px-2">
                    -
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-1 py-1">Suco 1 Litro</td>
                <td className="px-2 py-1">03</td>
                <td>
                  <button className="rounded-full bg-red-700 text-white text-3xl px-2">
                    -
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-center gap-8 my-3 pb-2">
            <button
              onClick={handleClick}
              className="rounded-full bg-teal-700 text-white px-4 py-2"
            >
              Confirmar
            </button>
            <button className="rounded-full bg-gray-700 text-white px-4 py-2">
              Cancelar
            </button>
          </div>
        </div>

        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {/* tabela com produtos */}
        <div className="w-full mx-auto px-1 overflow-auto mt-2">
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th className="px-1 py-1 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                  Produto
                </th>
                <th className="px-1 py-1 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Preço
                </th>

                <th className="px-1 py-1 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <tr key={prod.id}>
                  <td className="px-1 py-1">{prod.name}</td>
                  <td className="px-2 py-1 text-center">
                    {prod.price.toFixed(2)}
                  </td>
                  <td className="pl-1 py-1 text-left">
                    <div
                      onClick={handleAddItem}
                      className="flex justify-center px-0 py-1 text-gray-100 bg-emerald-600 rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Pedido;
