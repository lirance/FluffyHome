import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-all-request',
  templateUrl: './all-request.component.html',
  styleUrls: ['./all-request.component.css']
})
export class AllRequestComponent implements OnInit {
  switch_flag = 0;
  sent_active = 'active';
  received_active = '';
  ifSitter = false;

  constructor() {
  }

  ngOnInit() {
    this.switch_flag = Number(localStorage.getItem('request_flag'));
    if (this.switch_flag === 1) {
      this.switch_received();
    }
    this.ifSitter = localStorage.getItem('isSitter') === 'true';
  }

  switch_sent(): void {
    this.switch_flag = 0;
    this.received_active = '';
    this.sent_active = 'active';
  }

  switch_received(): void {
    this.switch_flag = 1;
    this.received_active = 'active';
    this.sent_active = '';
  }

}
