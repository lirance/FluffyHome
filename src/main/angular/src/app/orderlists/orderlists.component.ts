import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {OrderService, UserService} from '../_services';
import {NavigationEnd, Router} from '@angular/router';
import {Order} from '../_models';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {AcceptDialogComponent} from '../accept-dialog/accept-dialog.component';

@Component({
  selector: 'app-orderlists',
  templateUrl: './orderlists.component.html',
  styleUrls: ['./orderlists.component.css']
})

export class OrderlistsComponent implements OnInit {

  orderList: Order[] = [];
  currentUserID: string;
  acceptResult: string;
  isSitter: boolean;
  currentDate: Date = new Date();


  constructor(private orderService: OrderService, private router: Router, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getOrderList();
    this.currentUserID = localStorage.getItem('currentUserID');
  }

  getOrderList() {
    const isSitter = localStorage.getItem('isSitter');
    this.isSitter = isSitter === 'true';
    this.orderService.getOrderlist(isSitter).pipe(first()).subscribe(orderList => {
      this.orderList = orderList;
    });
  }

  accept(orderid: string) {
    this.orderService.acceptOrder(this.currentUserID, orderid).pipe(first()).subscribe(result => {
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


}
