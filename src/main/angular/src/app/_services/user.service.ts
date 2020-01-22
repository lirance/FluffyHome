import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User} from '../_models/user';
import {AvaliableWeekday} from '../_models/avaliableWeekday';
import {Pet} from '../_models/Pet';
import {backURL} from './const';

@Injectable()

export class UserService {
  private avaliableWeekday: AvaliableWeekday;

  constructor(private http: HttpClient) {
  }

  login(phone: string, password: string) {

    return this.http.get<User>(backURL + `user/login/getId?phone=` + phone + `&password=` + password);
  }

  signup(user: User) {
    return this.http.post(backURL + `user/register?phone=` + user.phone + `&email=`
      + user.email + `&password=` + user.password + `&username=` + user.username + `&address=`
      + user.address + `&zip=` + user.zip + `&userType=` + user.usertype, user);
  }

  getUserByphone(phone: string) {
    return this.http.post(backURL + `user/getUserByPhone?phone=` + phone, phone);
  }

  getUserById(id: string) {
    return this.http.get<User>(backURL + `user/getUserById?userId=` + id);
  }

  getP2PSitters(id: string) {
    return this.http.get<User[]>(backURL + `user/getP2PSitters?userId=` + id);
  }

  getSitters() {
    return this.http.get<User[]>(backURL + `user/getSitters`);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('currentUser');
    localStorage.clear();

  }

  profileEdit(userId: string, phone: string, username: string, email: string,
              zip: string, address: string, avaliableWeekday: AvaliableWeekday) {

    return this.http.get<string>(backURL + 'user/editProfile?userId=' + userId
      + '&phone=' + phone + '&email=' + email + '&username=' + username + '&zip=' + zip + '&address='
      + address + '&avaliableWeekday=' + JSON.stringify(avaliableWeekday));
  }


  getPets(userId: string) {
    return this.http.get<Pet[]>(backURL + 'userPet/getUserPets?userId=' + userId);
  }

  addPet(pet: Pet) {
    return this.http.get<string>(backURL + 'userPet/addPet?userId=' + pet.userId +
      '&petType=' + pet.petType + '&petName=' + pet.petName + '&petInfo=' + pet.petInfo);
  }

  getPetById(petId: String) {
    return this.http.get<Pet>(backURL + 'userPet/getPetInfoById?petId=' + petId);
  }

  editPetInfo(petId: string, petName: string, petType: string, petInfo: string) {
    return this.http.get<string>(backURL + 'userPet/editPetInfo?petId=' + petId
      + '&petType=' + petType + '&petName=' + petName + '&petInfo=' + petInfo);
  }
}

