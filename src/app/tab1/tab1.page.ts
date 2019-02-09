import { Component, Inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { User } from '../Models/user';
import { DOCUMENT } from '@angular/common'; 


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

user: User;
userId: string;
type: string;
name: string;
cardCero: any;
datos: any;
cardUno: string;
mostrarCuentas: boolean = false;
mostrarBoton: boolean = false;


constructor(public navCtrl: NavController, @Inject(DOCUMENT) document) {
	this.user = JSON.parse(localStorage.getItem('infoToken'));
}
/*const controls = this.cardOrders.map(c => new FormControl(false));
    controls[0].setValue(true);

    this.form = this.formBuilder.group({
      cardOrders: new FormArray(controls)
    });
}

cardsApi() {
    const selectedOrderIds = this.form.value.cardOrders
      .map((v, i) => v ? this.cardOrders[i].id : null)
      .filter(v => v !== null);

    console.log(selectedOrderIds);
  }*/

    ngClick() {
        let tarjetaName = document.getElementById('tarjeta').value;
        let tarjetaNameOf = null;
        var espacio = ' ';
        var arrayDeCadenas = tarjetaName.split(espacio);
        var cadTamaño = arrayDeCadenas.length - 1;
        let tipoT = arrayDeCadenas[cadTamaño];
        console.log(tipoT);
        localStorage.setItem('type', tipoT);
        if(tipoT === 'TDD') {
        	tarjetaNameOf = 'Tarjeta Azul';
        	localStorage.setItem('name', tarjetaNameOf);
        } else {
        	if(tipoT === 'TDC'){
        	tarjetaNameOf = 'Tarjeta Oro';
        	localStorage.setItem('name', tarjetaNameOf);
        	}
        	
        }

 		this.mostrarBoton = true;    
    }
	 
  verCuentas() {
  	var url = 'https://mighty-refuge-81707.herokuapp.com/api/catalogs/cards';
	var token = localStorage.getItem('token');
  	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	myHeaders.append("X-access-token", token);

  	fetch(url, {
	    method: 'GET',
	    
	   headers: myHeaders
	})
	  .then(response => response.json())
	  .then(json => {
	  	localStorage.setItem('type_cards', JSON.stringify(json.response))
	  	}, 
	  )

	 let infoTarjetas = JSON.parse(localStorage.getItem('type_cards'));
	 // console.log(infoTarjetas);
	 this.cardCero = infoTarjetas.type_cards;
	 this.mostrarCuentas = true;
  	}



 newAccount() {
	var url = 'https://mighty-refuge-81707.herokuapp.com/api/accounts';
	var id = localStorage.getItem('id');
	var card = JSON.parse(localStorage.getItem('type_cards'));
	var typeCard = localStorage.getItem('type');
	var nameCard = localStorage.getItem('name');
	var dataCards = { userId: id, type: typeCard, name: nameCard }
	var token = localStorage.getItem('token');
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	myHeaders.append("X-access-token", token);

	// console.log('userId: ' + id, 'type: ' + typeCard, 'name: ' + nameCard);
	fetch(url, {
	    method: 'POST',
	    body: JSON.stringify(dataCards),
	   headers: myHeaders
	  })
	  .then(response => response.json())
	 }

	 logOut(){
	 	localStorage.removeItem('id');
	 	localStorage.removeItem('token');
	 	localStorage.removeItem('infoToken');
	 	localStorage.removeItem('type_cards');
	 	localStorage.removeItem('type');
	 	localStorage.removeItem('name');
	 }
}