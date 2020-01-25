import {Component, OnInit} from '@angular/core';
import {Order} from '../_models';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {AlertService, OrderService, UserService} from '../_services';
import {Location} from '@angular/common';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {CompleteDialogComponent} from '../complete-dialog/complete-dialog.component';
import {AcceptDialogComponent} from '../accept-dialog/accept-dialog.component';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  orderDetail: Order;
  mapLink: string;
  orderId: string;
  currentUserId: string;
  completeResult: string;
  cancelResult = false;
  deleteResult = false;
  acceptResult: string;
  ifSitter = false;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private  orderService: OrderService,
    private userService: UserService,
    private location: Location,
    private dialog: MatDialog) {
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
    this.getOrder();
    this.currentUserId = localStorage.getItem('currentUserID');
    this.ifSitter = localStorage.getItem('isSitter') === 'true';
  }

  getOrder() {
    const orderId = this.route.snapshot.paramMap.get('orderId');
    this.orderService.getOrderDetail(orderId).pipe(first()).subscribe(order => {
      this.orderDetail = order;
      this.mapLink = 'https://www.google.com/maps/search/' + order.address + ' ,' + order.zip;
    });
  }

  complete() {
    const orderId = this.route.snapshot.paramMap.get('orderId');
    this.orderService.completeOrder(this.currentUserId, orderId, this.orderDetail.recipient.userId).pipe(first()).subscribe(result => {
      result.toString();
      this.completeResult = result;
      this.openCompleteDialog();
    });
  }

  cancelAcceptedOrder() {
    const orderId = this.route.snapshot.paramMap.get('orderId');
    const userid = localStorage.getItem('currentUserID');
    this.orderService.cancelAcceptedOrder(userid, orderId).pipe(first()).subscribe(result => {
      if (result) {
        this.cancelResult = true;
        this.backtolast();
      }

    });
  }

  deleteOrder() {
    const orderId = this.route.snapshot.paramMap.get('orderId');
    this.currentUserId = localStorage.getItem('currentUserID');
    this.orderService.deleteOrder(this.currentUserId, orderId).pipe(first()).subscribe(result => {
      if (result) {
        console.log('update successful');
        this.deleteResult = true;
        this.currentUserId = localStorage.getItem('currentUserID');
        localStorage.removeItem('currentUser');
        this.userService.getUserById(this.currentUserId).pipe(first()).subscribe(user => {
          localStorage.setItem('currentUser', JSON.stringify(user));
        });
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

  accept(orderId: string) {
    this.orderService.acceptOrder(this.currentUserId, orderId).pipe(first()).subscribe(result => {
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
