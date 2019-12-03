import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {OrderService} from '../_services/order.service';
import {first} from 'rxjs/operators';
import {AlertService} from '../_services';
import {Location} from '@angular/common';
import 'moment/locale/ru';
import 'moment-timezone';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})

export class CreateOrderComponent implements OnInit {
  orderForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private orderServie: OrderService,
    private alertService: AlertService,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      orderid: [],
      orderType: false,
      startDate: [],
      endDate: [],
      orderDescription: ['', Validators.required],
      maker: [],
      recipient: []
    });
  }

  get f() {
    return this.orderForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.orderForm.value.maker = localStorage.getItem('currentUserID');
    if (!this.orderForm.controls.orderType.errors && !this.orderForm.controls.startDate.errors &&
      !this.orderForm.controls.endDate.errors && !this.orderForm.controls.orderDescription.errors) {
      this.orderServie.createOrder(this.orderForm.value).pipe(first()).subscribe(
        success => {
          if (success !== 'true') {
            window.alert(success);
          } else {
            console.log('success!');
            this.router.navigate(['/dashboard', {outlets: {'aux': ['dashhome']}}]);
          }
        });
    }
    ;
    this.loading = true;
  }

  backtolast() {
    this.location.back();
  }
}
