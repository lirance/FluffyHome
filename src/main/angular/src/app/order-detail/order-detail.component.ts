import {Component, OnInit} from '@angular/core';
import {Order} from '../_models/order';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {OrderService} from '../_services';
import {Location} from '@angular/common';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {CompleteDialogComponent} from '../complete-dialog/complete-dialog.component';
import {AcceptDialogComponent} from '../accept-dialog/accept-dialog.component';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  orderDetail: Order;
  orderid: string;
  currentUserId: string;
  completeResult: string;
  cancelResult = false;
  deleteResult = false;
  acceptResult: string;


  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private route: ActivatedRoute, private  orderService: OrderService, private location: Location, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getOrder();
    this.currentUserId = localStorage.getItem('currentUserID');
  }

  getOrder() {
    const orderid = this.route.snapshot.paramMap.get('orderid');
    this.orderService.getOrderDetail(orderid).pipe(first()).subscribe(order => {
      this.orderDetail = order;
    });
  }

  complete() {
    const orderid = this.route.snapshot.paramMap.get('orderid');
    this.orderService.completeOrder(this.currentUserId, orderid, this.orderDetail.recipient.userid).pipe(first()).subscribe(result => {
      result.toString();
      this.completeResult = result;
      this.openCompleteDialog();
    });
  }

  cancelAcceptedOrder() {
    const orderid = this.route.snapshot.paramMap.get('orderid');
    const userid = localStorage.getItem('currentUserID');
    this.orderService.cancelAcceptedOrder(userid, orderid).pipe(first()).subscribe(result => {
      if (result) {
        this.cancelResult = true;
        this.backtolast();
      }

    });
  }

  deleteOrder() {
    const orderid = this.route.snapshot.paramMap.get('orderid');
    const userid = localStorage.getItem('currentUserID');
    this.orderService.deleteOrder(userid, orderid).pipe(first()).subscribe(result => {
      if (result) {
        this.deleteResult = true;
        this.backtolast();
      }

    });
  }

  openCompleteDialog(): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      completeResult: this.completeResult
    };

    this.dialog.open(CompleteDialogComponent, dialogConfig);
  }

  accept(orderid: string) {
    this.orderService.acceptOrder(this.currentUserId, orderid).pipe(first()).subscribe(result => {
      result.toString();
      console.log(result);
      this.acceptResult = result;
      this.openAcceptDialog();
    });

  }

  openAcceptDialog(): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      acceptResult: this.acceptResult
    };

    this.dialog.open(AcceptDialogComponent, dialogConfig);
  }


  backtolast() {
    this.location.back();
  }
}
