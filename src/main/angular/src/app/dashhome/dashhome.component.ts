import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {OrderService, UserService} from '../_services';
import {Router} from '@angular/router';
import {Order, User} from '../_models';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {AcceptDialogComponent} from '../accept-dialog/accept-dialog.component';

@Component({
  selector: 'app-dashhome',
  templateUrl: './dashhome.component.html',
  styleUrls: ['./dashhome.component.css']
})

export class DashhomeComponent implements OnInit {

  orderList: Order[] = [];
  p2psitters: User[] = [];
  sitters: User[] = [];
  currentUserID: string;
  acceptResult: string;
  isSitter: boolean;
  switch_flag = 0;
  created_active = 'active';
  accepted_active = '';


  constructor(private userService: UserService, private router: Router, private dialog: MatDialog) {
  }

  ngOnInit() {
    // this.getOrderList();
    this.currentUserID = localStorage.getItem('currentUserID');
    this.getSitterList();
  }

  switch_created(): void {
    this.switch_flag = 0;
    this.accepted_active = '';
    this.created_active = 'active';
  }

  switch_accepted(): void {
    this.switch_flag = 1;
    this.accepted_active = 'active';
    this.created_active = '';
  }

  // getOrderList() {
  //   const isSitter = localStorage.getItem('isSitter');
  //   this.isSitter = isSitter === 'true';
  //   this.orderService.getOrderlist(isSitter).pipe(first()).subscribe(orderList => {
  //     this.orderList = orderList;
  //   });
  // }

  getSitterList() {
    this.userService.getP2PSitters(this.currentUserID).pipe(first()).subscribe(users => {
      this.p2psitters = users;
    });
    this.userService.getSitters().pipe(first()).subscribe(users => {
      this.sitters = users;
    });
  }

  // accept(orderid: string) {
  //   this.orderService.acceptOrder(this.currentUserID, orderid).pipe(first()).subscribe(result => {
  //     result.toString();
  //     console.log(result);
  //     this.acceptResult = result;
  //     this.openAcceptDialog();
  //   });
  //
  // }
  //
  // openAcceptDialog(): void {
  //
  //   const dialogConfig = new MatDialogConfig();
  //
  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
  //
  //   dialogConfig.data = {
  //     acceptResult: this.acceptResult
  //   };
  //
  //   this.dialog.open(AcceptDialogComponent, dialogConfig);
  // }


}
