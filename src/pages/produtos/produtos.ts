import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';


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
           this.loadImageUrls();
        }, 
        error =>{});
  }

  loadImageUrls() {
    for (var i=0; i< this.items.length; i++) {
      let item = this.items[i];
     // console.log(item);
      this.produtoService.getSmallImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
        },
        error => {});
    }
  } 

  showDetail(idProduto: string){
    this.navCtrl.push('ProdutoDetailPage', { idProduto : idProduto } );
  }

}
