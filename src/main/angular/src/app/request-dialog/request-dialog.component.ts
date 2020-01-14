import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import {OrderService} from '../_services';
import {first} from 'rxjs/operators';
import {Order, PersonalOrderShow} from '../_models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-request-dialog',
  templateUrl: './request-dialog.component.html',
  styleUrls: ['./request-dialog.component.css'],
  providers: [NgbRatingConfig]
})

export class RequestDialogComponent implements OnInit {
  userId: number;
  sitterType: boolean;
  rate = 0;
  requestForm: FormGroup;
  currentUserID: string;
  submitResult: boolean;
  rateResult: string;
  expireDate: Date;

  orderList: PersonalOrderShow[];

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<RequestDialogComponent>,
              private orderService: OrderService,
              @Inject(MAT_DIALOG_DATA) data,
              config: NgbRatingConfig
  ) {
    this.userId = data.userId;
    this.sitterType = data.sitterType;
    config.max = 5;
  }

  ngOnInit() {
    this.submitResult = false;
    this.currentUserID = localStorage.getItem('currentUserID');
    // this.order.orderId=-1;
    // this.order.startDate=""
    this.getCreatedOrderList();
    this.requestForm = this.formBuilder.group({
      orderId: [0]
    })
    ;
  }

  getCreatedOrderList() {
    this.orderService.getRequestOrder(this.currentUserID, this.sitterType, this.userId).pipe(first()).subscribe(orders => {
      this.orderList = orders;
      // this.order=orders.
    });
  }


  close() {
    this.dialogRef.close();
    window.location.reload();
  }

  submit() {
    this.submitResult = true;
    this.setDate(this.requestForm.value.orderId);
    this.orderService.sendRequest(this.currentUserID, this.userId, this.requestForm.value.orderId,
      new Date(this.expireDate)).pipe(first()).subscribe(result => {
      result.toString();
      console.log(result);
      this.rateResult = result;
    });
    this.close();
  }

  setDate(orderId: number) {
    for (const od of this.orderList) {
      if (od.orderId === Number(orderId)) {
        this.expireDate = od.startDate;
      }
    }
  }

  createOrder() {
    this.router.navigate(['/dashboard', {outlets: {'aux': ['createorder']}}]);
    this.dialogRef.close();
  }
}
