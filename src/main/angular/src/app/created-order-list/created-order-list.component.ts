import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {OrderService, UserService} from '../_services';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Location} from '@angular/common';
import {PersonalOrderShow} from '../_models';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {RateOrderDialogComponent} from '../rate-order-dialog/rate-order-dialog.component';
import {ChangeOrderTypeDialogComponent} from '../change-orderType-dialog/change-order-type-dialog.component';
import {CompleteDialogComponent} from '../complete-dialog/complete-dialog.component';

@Component({
  selector: 'app-created-order-list',
  templateUrl: './created-order-list.component.html',
  styleUrls: ['./created-order-list.component.css']
})
export class CreatedOrderListComponent implements OnInit {
  currentUserID: string;
  createdOrderList: PersonalOrderShow [] = [];
  currentDate: Date = new Date();
  changeTypeResult: string;
  completeResult: string;

  constructor(private orderService: OrderService,
              private userService: UserService,
              private dialog: MatDialog,
              private router: Router,
              private location: Location,
              private route: ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit() {
    this.currentUserID = localStorage.getItem('currentUserID');
    localStorage.setItem('order_flag', '0');
    this.getCreatedOrderList();
  }

  getCreatedOrderList() {
    this.orderService.getCreatedOrder(this.currentUserID).pipe(first()).subscribe(orders => {

      for (let or of orders) {
        or.startDate = new Date(or.startDate);
        this.createdOrderList.push(or);
      }
      // this.createdOrderList = orders;
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

  deleteOrder(orderId: number) {
    // const orderId = this.route.snapshot.paramMap.get('orderId');
    this.orderService.deleteOrder(this.currentUserID, orderId.toString()).pipe(first()).subscribe(result => {
      if (result) {
        // this.getCreatedOrderList();
        const currentUserId = localStorage.getItem('currentUserID');
        localStorage.removeItem('currentUser');
        this.userService.getUserById(currentUserId).pipe(first()).subscribe(user => {
          localStorage.setItem('currentUser', JSON.stringify(user));
        });
        window.location.reload();
        // this.router.navigate(['/dashboard', {outlets: {'aux': ['myorder']}}]);
      }

    });
  }

  complete(orderId: string, recipientId: number) {
    // const orderId = this.route.snapshot.paramMap.get('orderId');
    this.orderService.completeOrder(this.currentUserID, orderId, recipientId).pipe(first()).subscribe(result => {
      result.toString();
      this.completeResult = result;
      this.openCompleteDialog();
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

  backtolast() {
    this.location.back();
  }
}
