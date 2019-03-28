import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController ,  public menu: MenuController) {

  }

  /** Quando for entrar na página , desabilita o menu */
  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }
 
   /** Quando sair da página , hábilita o menu */
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  /**
   * nome da classe 'CategoriasPage'  definido no arquivo 'categorias.ts' 
   */
  login(){
    //this.navCtrl.push('CategoriasPage');  // usado para empilhar , abre a segunda tela com um link para voltar para a anterior
     this.navCtrl.setRoot('CategoriasPage'); 
  }

}
