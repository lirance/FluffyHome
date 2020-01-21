import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {
  switch_flag = 0;
  created_active = 'active';
  accepted_active = '';

  constructor() {
  }

  ngOnInit() {
    this.switch_flag = Number(localStorage.getItem('order_flag'));
    if (this.switch_flag === 1) {
      this.switch_accepted();
    }
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

}
