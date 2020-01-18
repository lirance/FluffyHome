import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {OrderService} from '../_services';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {PersonalOrderShow} from '../_models';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {RateOrderDialogComponent} from '../rate-order-dialog/rate-order-dialog.component';
import {AcceptDialogComponent} from '../accept-dialog/accept-dialog.component';
import {ChangeOrderTypeDialogComponent} from '../change-orderType-dialog/change-order-type-dialog.component';

@Component({
  selector: 'app-created-order-list',
  templateUrl: './created-order-list.component.html',
  styleUrls: ['./created-order-list.component.css']
})
export class CreatedOrderListComponent implements OnInit {
  currentUserID: string;
  createdOrderList: PersonalOrderShow [] = [];
  changeTypeResult: string;

  constructor(private orderService: OrderService, private dialog: MatDialog, private router: Router,
              private location: Location, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.currentUserID = localStorage.getItem('currentUserID');
    this.getCreatedOrderList();
  }

  getCreatedOrderList() {
    this.orderService.getCreatedOrder(this.currentUserID).pipe(first()).subscribe(orders => {
      this.createdOrderList = orders;
    });
  }

  rate(orderId: number, state: string) {
    this.openRateDialog(orderId, state);

  }

  openRateDialog(orderId: number, state: string): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {orderId: orderId, state: state};

    this.dialog.open(RateOrderDialogComponent, dialogConfig);
  }

  changeOrderType(orderId: string) {

    this.openChangeTypeDialog(orderId);
    this.getCreatedOrderList();
  }

  openChangeTypeDialog(orderId: string): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {orderId: orderId};

    this.dialog.open(ChangeOrderTypeDialogComponent, dialogConfig);
  }

  backtolast() {
    this.location.back();
  }
}
