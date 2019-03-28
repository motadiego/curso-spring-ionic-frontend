import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  /**
   * nome da classe 'CategoriasPage'  definido no arquivo 'categorias.ts' 
   */
  login(){
    //this.navCtrl.push('CategoriasPage');  // usado para empilhar , abre a segunda tela com um link para voltar para a anterior
     this.navCtrl.setRoot('CategoriasPage'); 
  }

}
