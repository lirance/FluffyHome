import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {OrderService} from '../_services/order.service';
import {first} from 'rxjs/operators';
import {AlertService} from '../_services';
import {Location} from '@angular/common';
import {NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
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

  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private orderService: OrderService,
    private alertService: AlertService,
    private location: Location,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private config: NgbDatepickerConfig
  ) {
    this.fromDate = calendar.getNext(calendar.getToday(), 'd', 1);
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 2);
    config.minDate = this.fromDate;
    config.outsideDays = 'hidden';
    // config.markDisabled(date:NgbDate)=>calendar.getwe
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  validateInput(currentValue: NgbDate, input: string): NgbDate {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      orderId: [],
      orderType: false,
      // startDate: ['', Validators.required],
      // endDate: ['', Validators.required],
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
    if (!this.orderForm.controls.orderType.errors && !this.orderForm.controls.orderDescription.errors && this.checkDate()) {
      this.orderService.createOrder(this.orderForm.value, this.getDate(this.fromDate), this.getDate(this.toDate)).pipe(first()).subscribe(
        success => {
          if (success !== 'true') {
            window.alert(success);
          } else {
            console.log('success!');
            this.router.navigate(['/dashboard', {outlets: {'aux': ['dashhome']}}]);
          }
        });
    }
    this.loading = true;
  }

  checkDate() {
    return !(this.fromDate === null || this.toDate === null);
  }

  getDate(date: NgbDate) {
    return new Date(date.year, date.month - 1, date.day);
  }

  backtolast() {
    this.location.back();
  }
}
