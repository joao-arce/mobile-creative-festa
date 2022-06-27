import { IOrder } from '../types/order';
import { getBrazilianDate } from '../util/helpers';

export const listOpenOrder = async () => {
  // const dateParam = new Date().toISOString().slice(0, 10);

  const dateParam = getBrazilianDate();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/orderwithopenitems/${dateParam}`
  );

  const emptyOrder: IOrder[] = [];
  if (response.ok) {
    const list = await response.json();
    return list.orders;
  } else {
    console.log('Error', response.status);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return emptyOrder;
};
export const searchOrder = async (comanda: number) => {
  const dateParam = getBrazilianDate();

  const FECHADA = 'fechada';
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/notclosed/${FECHADA}/${comanda}/${dateParam}`;

  // order/notclosed/:status/:number/:date
  const response = await fetch(`${url}`);

  if (response.ok) {
    const order = await response.json();
    return order;
  }
};

export const getParcial = async (number: number) => {
  const dateParam = getBrazilianDate();

  // order/parcial/:number/:date
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/order/parcial/${number}/${dateParam}`
  );
  return response;
};
