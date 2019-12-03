import {User} from './user';

export class Order {
  orderid: number;
  status: string;
  // use credits?
  credits: number;
  address: string;
  zip: number;
  orderType: boolean;
  startDate: Date;
  endDate: Date;
  orderDescription: string;
  maker: User;
  recipient: User;
}
