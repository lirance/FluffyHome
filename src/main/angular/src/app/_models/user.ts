import {AvaliableWeekday} from './avaliableWeekday';

export class User {
  userid: number;
  username: string;
  password: string;
  phone: string;
  credits: number;
  address: string;
  zip: number;
  latlng: number;
  email: string;
  userType: boolean;
  avaliableDate: string;
  avaliableWeekday: AvaliableWeekday;
  rateNumber: number;
  averageRate: number;
}
