import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sitter-order',
  templateUrl: './sitter-order.component.html',
  styleUrls: ['./sitter-order.component.css']
})
export class SitterOrderComponent implements OnInit {
  switch_flag: number = 0;
  created_active: string = 'active';
  accepted_active: string = '';

  constructor() {
  }

  ngOnInit() {

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
