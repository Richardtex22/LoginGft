import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { User } from '../Models/user';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {


currentUser: User;

	constructor() {

	}

RegisterOk(){
}


	toReg() {
		
fetch('https://mighty-refuge-81707.herokuapp.com/api/auth/user/create', {
    method: 'POST',
    body: JSON.stringify(
        this.currentUser
    ),
    headers: {
      "Content-type": "application/json; charset=utf-8"
    }
  })
  .then(response => response.json())
  
 }
}
