import {Component, OnInit} from '@angular/core';
import {AlertService, UserService} from '../_services';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../_models';
import {first} from 'rxjs/operators';
import {Location} from '@angular/common';
import {AvaliableWeekday} from '../_models/avaliableWeekday';
import {Pet} from '../_models/Pet';

@Component({
  selector: 'app-editpetinfo',
  templateUrl: './editpetinfo.component.html',
  styleUrls: ['./editpetinfo.component.css']
})
export class EditPetInfoComponent implements OnInit {
  petInfoForm: FormGroup;
  currentPet: Pet;
  currentPetId: string;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private alertService: AlertService,
    private location: Location
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0, 0);
      }
    });
  }


  ngOnInit() {
    this.currentPetId = this.route.snapshot.paramMap.get('petid');
    this.userService.getPetById(this.currentPetId).pipe(first()).subscribe(pet => {
        this.currentPet = pet;
        this.petInfoForm = this.formBuilder.group({
          petId: [this.currentPet.petid],
          petName: [this.currentPet.petname, Validators.required],
          petType: [this.currentPet.pettype, Validators.required],
          petInfo: [this.currentPet.petinfo, Validators.required]
        });
      }
    );
  }


  get f() {
    return this.petInfoForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.petInfoForm.invalid) {
      return;
    }

    this.loading = true;


    this.userService.editPetInfo(this.petInfoForm.value.petId, this.petInfoForm.value.petName,
      this.petInfoForm.value.petType, this.petInfoForm.value.petInfo)
      .pipe(first())
      .subscribe(
        data => {
          data.toString();
          if (data) {
            console.log('update successful');
            this.userService.getPetById(this.currentPetId).pipe(first()).subscribe(pet => {
              this.currentPet = pet;
            });
            this.router.navigate(['/dashboard', {outlets: {'aux': ['dashhome']}}]);
          }

          if (!data) {
            console.log('update error');
          }

        });
  }

  backtolast() {
    this.location.back();
  }

}
