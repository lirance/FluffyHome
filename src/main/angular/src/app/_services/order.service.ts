import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Order} from '../_models';
import {PersonalOrderShow} from '../_models';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {backurl} from './const';

@Injectable()

export class OrderService {
  constructor(private http: HttpClient) {
  }

  getOrderlist(isSitter: string) {
    return this.http.get<Order[]>(backurl + 'orders/getOrders?isSitter=' + isSitter);
  }

  createOrder(order: Order, fromDate: Date, toDate: Date) {
    return this.http.get(backurl + 'order/create?userid=' + order.maker + '&orderType=' + order.orderType +
      '&startDate=' + fromDate + '&endDate=' + toDate.toDateString() + '&orderDescription=' + order.orderDescription,
      {responseType: 'text'});
  }

  getOrderDetail(orderid: string) {
    return this.http.get<Order>(backurl + 'orders/getOrderDetailById?orderId=' + orderid);
  }

  acceptOrder(userid: string, orderid: string) {
    return this.http.get<string>(backurl + 'order/accept?userId=' + userid + '&orderId=' + orderid);
  }

  completeOrder(userid: string, orderid: string, recipientId: number) {
    return this.http.get<string>(backurl + 'order/complete?userId=' + userid + '&orderId=' + orderid +
      '&recipientId=' + recipientId);
  }

  rateOrder(userid: string, orderid: string, rate: string) {
    return this.http.get<string>(backurl + 'order/rate?orderId=' + orderid + '&userId=' + userid + '&rate=' + rate);
  }

  getCreatedOrder(userid: string) {
    return this.http.get<PersonalOrderShow[]>(backurl + 'orders/getCreateOrder?userId=' + userid);
  }

  getAcceptedOrder(userid: string) {
    return this.http.get<PersonalOrderShow[]>(backurl + 'orders/getAcceptedOrder?userId=' + userid);
  }

  cancelAcceptedOrder(userid: string, orderid: string) {
    return this.http.get<string>(backurl + 'order/cancel?userId=' + userid + '&orderId=' + orderid);
  }

  deleteOrder(userid: string, orderid: string) {
    return this.http.get<string>(backurl + 'order/delete?userId=' + userid + '&orderId=' + orderid);
  }

}
