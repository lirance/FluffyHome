import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {OrderService} from '../_services';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {PersonalOrderShow} from '../_models';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {RateOrderDialogComponent} from '../rate-order-dialog/rate-order-dialog.component';

@Component({
    selector: 'app-created-order-list',
    templateUrl: './created-order-list.component.html',
    styleUrls: ['./created-order-list.component.css']
})
export class CreatedOrderListComponent implements OnInit {
    currentUserID: string;
    createdOrderList: PersonalOrderShow [] = [];

    constructor(private orderService: OrderService, private dialog: MatDialog, private router: Router,
                private location: Location, private route: ActivatedRoute) {
    }
ß
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

    changeOrderType(orderId: number) {
        this.orderService.changeOrderType(this.currentUserID, orderId).pipe(first()).subscribe(result => {
            if (result) {
                this.getCreatedOrderList();
            }

        });
    }

    openRateDialog(orderId: number, state: string): void {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {orderId: orderId, state: state};

        this.dialog.open(RateOrderDialogComponent, dialogConfig);
    }

    backtolast() {
        this.location.back();
    }
}
