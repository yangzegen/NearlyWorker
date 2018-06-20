import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { User } from "../../models/user";
import { AngularFireAuth } from "angularfire2/auth"

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  user = {} as User;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController) {
  }
  ionViewWillLoad(){
    this.afAuth.authState.subscribe(data => {
      if(data.email && data.uid){
        this.navCtrl.setRoot(ProfilePage);
    }
    });
  }

  goToSignup(params){
    if (!params) params = {};
    this.navCtrl.push(SignupPage);
  }
  login(user:User){
    try{
      const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      console.log(result);
      if(result){
        this.navCtrl.setRoot(HomePage);
      }
      }
      catch(e){
        console.error(e);
      }
  }

}
