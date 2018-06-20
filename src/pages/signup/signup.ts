import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User } from "../../models/user";
import { AngularFireAuth } from "angularfire2/auth"

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
user = {} as User;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController) {
  }
  async register(user:User){
    try{
    const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
    console.log(result);
  }
  catch(e){
    console.error(e);
  }
  }

}
