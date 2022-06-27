import React from 'react';
import { IProduct } from '../types/product';

const colorBeer = 'bg-blue-600';
const colorBeerHover = 'hover:bg-blue-500';
const titleBeer = 'Cervejas';
const colorRefri = 'bg-teal-600';
const colorRefriHover = 'hover:bg-teal-500';
const titleRefri = 'Refrigerantes';
const colorSuco = 'bg-cyan-600';
const colorSucoHover = 'hover:bg-cyan-600';
const titleSucos = 'Sucos / Águas';

type Props = {
  products: IProduct[];
  type: 'CERVEJA' | 'REFRIGERANTES' | 'SUCOS';
  addItem(product: IProduct): void;
};

const Product = ({ products, type, addItem }: Props) => {
  const handleAddItem = (e: React.SyntheticEvent, product: IProduct) => {
    e.preventDefault();
    addItem(product);
  };

  const loadProduct = () => {
    let color = '';
    let hover = '';
    let id_category = 1;

    switch (type) {
      case 'CERVEJA':
        color = colorBeer;
        hover = colorBeerHover;
        id_category = 1;
        break;
      case 'REFRIGERANTES':
        color = colorRefri;
        hover = colorRefriHover;
        id_category = 2;
        break;
      case 'SUCOS':
        color = colorSuco;
        hover = colorSucoHover;
        id_category = 3;
        break;

      default:
        break;
    }

    const result = products.filter((p) => {
      if (p.id_category === id_category) return p;
    });

    if (result.length > 0) {
      return (
        <details className="shadow">
          <summary
            className={`${color} rounded-md text-gray-50 cursor-pointer ${hover} list-none px-4 py-2 font-medium`}
          >
            {type === 'CERVEJA'
              ? titleBeer
              : type === 'REFRIGERANTES'
              ? titleRefri
              : titleSucos}
          </summary>

          {result.map((prod) => (
            <section
              key={prod.id}
              className="w-full grid grid-cols-5 items-center py-1"
            >
              <div className="col-span-3 ">{prod.name}</div>
              <div>{prod.price.toFixed(2)}</div>
              <div>
                <button
                  onClick={(e) => handleAddItem(e, prod)}
                  className="flex justify-center px-0 py-1 text-gray-100 bg-emerald-600 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-10"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </section>
          ))}
        </details>
      );
    }
  };

  return <div>{loadProduct()}</div>;
};

export default Product;
