import { IItem } from './item';
import { ITicket } from './ticket';

export type IOrder = {
  id: number;
  number: number;
  client_name: string;
  date: string;
  adult_qtd: number;
  kid_qtd: number;
  status: string;
  id_ticket: number;
  id_cashier: number;
};

export type ICompletedOrder = {
  id: number;
  number: number;
  client_name: string;
  date: string;
  adult_qtd: number;
  kid_qtd: number;
  status: string;
  id_ticket: number;
  id_cashier: number;
  items: IItem[];
  ticket: ITicket;
};
