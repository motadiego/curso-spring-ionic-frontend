import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  creds : CredenciaisDTO = {
    email: "",
    senha: ""
  }  

  constructor(
      public navCtrl: NavController ,  
      public menu: MenuController,
      public auth: AuthService) {
  }

  /** é executado quando a página está prestes a entrar e se tornar a página ativa, desabilita o menu */
  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }
 
   /** Quando sair da página , hábilita o menu */
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  /** é executado quando a página entrou totalmente e agora é a página ativa. */
  ionViewDidEnter(){
    this.auth.refreshToken()
    .subscribe(
      response => {
         this.auth.successfulLogin(response.headers.get('Authorization'));
          this.navCtrl.setRoot('CategoriasPage');
      }
     ,error => {});
  }


  /**
   * nome da classe 'CategoriasPage'  definido no arquivo 'categorias.ts' 
   */
  login(){
    //this.navCtrl.push('CategoriasPage');  // usado para empilhar , abre a segunda tela com um link para voltar para a anterior
    this.auth.authenticate(this.creds)
            .subscribe(
              response => {this.auth.successfulLogin(response.headers.get('Authorization')); this.navCtrl.setRoot('CategoriasPage');}
             ,error => {}
            );
  }

  signup(){
    this.navCtrl.push('SignupPage');
  }

}
