import {AvaliableWeekday} from './avaliableWeekday';

export class User {
  userId: number;
  username: string;
  password: string;
  phone: string;
  credits: number;
  address: string;
  zip: number;
  latlng: number;
  email: string;
  usertype: boolean;
  userType: string;
  avaliableDate: string;
  avaliableWeekday: AvaliableWeekday;
  rateNumber: number;
  averageRate: number;
}
