import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {OrderService} from '../_services/order.service';
import {first} from 'rxjs/operators';
import {AlertService, UserService} from '../_services';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})

export class AddPetComponent implements OnInit {
  // orderForm: FormGroup;
  petForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userServie: UserService,
    private alertService: AlertService,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.petForm = this.formBuilder.group({
      userid: [],
      petid: [],
      pettype: [],
      petname: [],
      petinfo: []
    })
    ;
  }

  get f() {
    return this.petForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.petForm.value.userid = localStorage.getItem('currentUserID');
    this.petForm.value.petid = '0';


    this.userServie.addPet(this.petForm.value).pipe(first()).subscribe(
      success => {
        console.log('success!');
        this.router.navigate(['/dashboard', {outlets: {'aux': ['dashhome']}}]);
      });
    ;
    this.loading = true;
  }

  backtolast() {
    this.location.back();
  }
}
