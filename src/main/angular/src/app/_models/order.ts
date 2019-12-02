import {User} from './user';

export class Order {
  orderid: number;
  status: string;
  // use credits?
  orderType: boolean;
  startDate: Date;
  endDate: Date;
  orderDescription: string;
  maker: User;
  recipient: User;
}
