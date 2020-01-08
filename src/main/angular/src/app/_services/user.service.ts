import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User} from '../_models/user';
import {AvaliableWeekday} from '../_models/avaliableWeekday';
import {Pet} from '../_models/Pet';
import {backurl} from './const';

@Injectable()

export class UserService {
  private avaliableWeekday: AvaliableWeekday;

  constructor(private http: HttpClient) {
  }

  login(phone: string, password: string) {

    return this.http.get<User>(backurl + `user/login/getId?phone=` + phone + `&password=` + password);
  }

  signup(user: User) {
    return this.http.post(backurl + `user/register?phone=` + user.phone + `&email=`
      + user.email + `&password=` + user.password + `&username=` + user.username + `&address=`
      + user.address + `&zip=` + user.zip + `&userType=` + user.usertype, user);
  }

  getUserByphone(phone: string) {
    return this.http.post(backurl + `user/getUserByPhone?phone=` + phone, phone);
  }

  getUserById(id: string) {
    return this.http.get<User>(backurl + `user/getUserById?userid=` + id);
  }

  getP2PSitters(id: string) {
    return this.http.get<User[]>(backurl + `user/getP2PSitters?userid=` + id);
  }

  getSitters() {
    return this.http.get<User[]>(backurl + `user/getSitters`);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('currentUser');
    localStorage.clear();

  }

  profileEdit(userid: string, phone: string, username: string, email: string,
              zip: string, address: string, avaliableWeekday: AvaliableWeekday) {

    return this.http.get<string>(backurl + 'user/editProfile?userid=' + userid
      + '&phone=' + phone + '&email=' + email + '&username=' + username + '&zip=' + zip + '&address='
      + address + '&avaliableWeekday=' + JSON.stringify(avaliableWeekday));
  }


  getPets(userId: string) {
    return this.http.get<Pet[]>(backurl + 'userPet/getUserPets?userid=' + userId);
  }

  addPet(pet: Pet) {
    return this.http.get<string>(backurl + 'userPet/addPet?userid=' + pet.userid +
      '&petType=' + pet.pettype + '&petName=' + pet.petname + '&petInfo=' + pet.petinfo);
  }

  getPetById(petid: String) {
    return this.http.get<Pet>(backurl + 'userPet/getPetInfoById?petid=' + petid);
  }

  editPetInfo(petid: string, petName: string, petType: string, petInfo: string) {
    return this.http.get<string>(backurl + 'userPet/editPetInfo?petid=' + petid
      + '&petType=' + petType + '&petName=' + petName + '&petInfo=' + petInfo);
  }
}

