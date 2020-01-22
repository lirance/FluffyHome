import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Order} from '../_models';
import {PersonalOrderShow} from '../_models';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {backURL} from './const';
import {OrderRequest} from '../_models';

@Injectable()

export class OrderService {
  constructor(private http: HttpClient) {
  }

  getOrderlist(isSitter: string) {
    return this.http.get<Order[]>(backURL + 'orders/getOrders?isSitter=' + isSitter);
  }

  createOrder(order: Order, fromDate: Date, toDate: Date) {
    return this.http.get(backURL + 'order/create?userId=' + order.maker + '&orderType=' + order.orderType +
      '&startDate=' + fromDate + '&endDate=' + toDate + '&orderDescription=' + order.orderDescription,
      {responseType: 'text'});
  }

  getOrderDetail(orderId: string) {
    return this.http.get<Order>(backURL + 'orders/getOrderDetailById?orderId=' + orderId);
  }

  acceptOrder(userId: string, orderId: string) {
    return this.http.get<string>(backURL + 'order/accept?userId=' + userId + '&orderId=' + orderId);
  }

  completeOrder(userId: string, orderId: string, recipientId: number) {
    return this.http.get<string>(backURL + 'order/complete?userId=' + userId + '&orderId=' + orderId +
      '&recipientId=' + recipientId);
  }

  rateOrder(userId: string, orderId: string, rate: string) {
    return this.http.get<string>(backURL + 'order/rate?orderId=' + orderId + '&userId=' + userId + '&rate=' + rate);
  }

  getCreatedOrder(userId: string) {
    return this.http.get<PersonalOrderShow[]>(backURL + 'orders/getCreateOrder?userId=' + userId);
  }

  getAcceptedOrder(userId: string) {
    return this.http.get<PersonalOrderShow[]>(backURL + 'orders/getAcceptedOrder?userId=' + userId);
  }

  cancelAcceptedOrder(userId: string, orderId: string) {
    return this.http.get<string>(backURL + 'order/cancel?userId=' + userId + '&orderId=' + orderId);
  }

  deleteOrder(userId: string, orderId: string) {
    return this.http.get<string>(backURL + 'order/delete?userId=' + userId + '&orderId=' + orderId);
  }

  changeOrderType(userId: string, orderId: string) {
    return this.http.get<string>(backURL + 'order/changeOrderType?userId=' + userId + '&orderId=' + orderId);
  }

  sendRequest(fuId: string, tuId: number, orderId: number, expireDate: Date) {
    return this.http.get<string>(backURL + 'order/request/create?fuId=' + fuId + '&tuId=' + tuId
      + '&orderId=' + orderId + '&startDate=' + expireDate);
  }

  responseRequest(orderId: number, tuId: number, accept: boolean) {
    return this.http.get<string>(backURL + 'order/request/response?orderId=' + orderId + '&tuId=' + tuId + '&accept=' + accept);
  }

  getRequestOrder(userId: string, sitterType: boolean, tuId: number) {
    return this.http.get<PersonalOrderShow[]>(backURL + 'orders/getRequestOrders?userId=' + userId + '' +
      '&sitterType=' + sitterType + '&tuId=' + tuId);
  }

  getRequests(userId: string) {
    return this.http.get<OrderRequest[]>(backURL + 'order/request/getUserRequests?userId=' + userId);
  }

  getMyRequests(userId: string) {
    return this.http.get<OrderRequest[]>(backURL + 'order/request/getMyRequests?userId=' + userId);
  }
}
