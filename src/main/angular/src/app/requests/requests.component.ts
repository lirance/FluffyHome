import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {OrderService} from '../_services';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {OrderRequest} from '../_models';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})

export class RequestsComponent implements OnInit {

  requests: OrderRequest[] = [];
  currentUserID: string;
  acceptResult: string;
  isSitter: boolean;


  constructor(
    private orderService: OrderService,
    private router: Router,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getRequests();
  }

  getRequests() {
    this.currentUserID = localStorage.getItem('currentUserID');
    const isSitter = localStorage.getItem('isSitter');
    this.isSitter = isSitter === 'true';
    this.orderService.getRequests(this.currentUserID).pipe(first()).subscribe(requests => {
      this.requests = requests;
    });
  }

  response(orderId: number, accept: boolean) {
    this.orderService.responseRequest(orderId, Number(this.currentUserID), accept).pipe(first()).subscribe(result => {
      result.toString();
      console.log(result);
      this.getRequests();
      //   this.acceptResult = result;
      //   this.openAcceptDialog();
    });

  }

}
