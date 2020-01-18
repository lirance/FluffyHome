import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {OrderService} from '../_services';

@Component({
  selector: 'app-change-order-type-dialog',
  templateUrl: './change-order-type-dialog.component.html',
  styleUrls: ['./change-order-type-dialog.component.css']
})
export class ChangeOrderTypeDialogComponent implements OnInit {
  // changeTypeResult: string;
  orderId: string;
  currentUserID: string;

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<ChangeOrderTypeDialogComponent>,
    private orderService: OrderService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.orderId = data.orderId;

  }

  ngOnInit() {
  }

  submit() {
    this.currentUserID = localStorage.getItem('currentUserID');
    this.orderService.changeOrderType(this.currentUserID, this.orderId).pipe(first()).subscribe(result => {
        if (result) {
          this.dialogRef.close();
          window.location.reload();
        }
      }
    );
  }

  close() {
    this.dialogRef.close();
    window.location.reload();
  }

}
