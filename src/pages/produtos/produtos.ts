import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';


@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[];

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams, 
      public produtoService: ProdutoService ) {
  }

  ionViewDidLoad() {
    // recupera o id da categoria passado como parametro no arquivo "categoria.ts"
    let idCategoria = this.navParams.get('idCategoria'); 
    this.produtoService.findByCategoria(idCategoria)
        .subscribe(response => {
           this.items = response['content'];
        }, 
        error =>{});
  }

}
