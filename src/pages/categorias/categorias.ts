import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public categoriaService: CategoriaService) {
    }

  ionViewDidLoad() {
    this.categoriaService.findAll()
    .subscribe(this.f , this.error); // passa a função 'f' como argumento para a função 'subscribe'
  }

  /***
   * função que recebe a responsa e exibe na tela (função callback)
   */
  f(response){
    console.log(response);
  }

  error(error){
    console.log(error);
  }
}
