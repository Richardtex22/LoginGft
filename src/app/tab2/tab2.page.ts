import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import * as nJwt from 'njwt';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router'


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
})
export class Tab2Page {

email: string;
password: string;
userID: string;
type: string;
name: string;
datos: any;
confirmB: boolean=false;


constructor(
	public navCtrl: NavController, 
	public alertCtrl: AlertController, 
	public _router: Router) {

	}

toLogin() {
	var url = 'https://mighty-refuge-81707.herokuapp.com/api/auth/user/authenticate';
var data = {email: this.email,
password: this.password};

	fetch(url, {
	    method: 'POST',
	    body: JSON.stringify(data),
	   headers: {
      "Content-type": "application/json"
    }
	  })
	  .then(response => response.json())
	  .then(json => localStorage.setItem('token', json.token))
	  var tokens = localStorage.getItem('token');
	  var helper = new JwtHelperService();
	  var decodedToken = helper.decodeToken(tokens);
	/* en esta seccion detecte un pequeño delay al momento de loguearte por primer vez 
	 no alcanza a decodear la funcion del JWT, ya que la peticion a Api del token tarda
	 mas que correr la funcion del decode,en el segundo login ya guarda correctamente 
	 en LocalStorage el id y la info del usuario.
	 Tuve que jugar con los botones para mandar a llamar la funcion del decode ya que no
	 pude implementar el SETIMEOUT correctamente*/
 
}
    confirm(){   
    	this.confirmB = true;
    }
	functionDelay() {
    	var tokens = localStorage.getItem('token');
	    var helper = new JwtHelperService();
		var decodedToken = helper.decodeToken(tokens);
		localStorage.setItem('infoToken', JSON.stringify(decodedToken));
    	localStorage.setItem('id', decodedToken.id);
    	this._router.navigate(['/tabs/tab1']);
  	   
  }
  
}