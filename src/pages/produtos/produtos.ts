import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
      public produtoService: ProdutoService,
      public loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData(){
    // recupera o id da categoria passado como parametro no arquivo "categoria.ts"
    let idCategoria = this.navParams.get('idCategoria'); 
        
    // carrega o objeto de loading...
    let loading = this.presentLoading();

    this.produtoService.findByCategoria(idCategoria)
        .subscribe(response => {
          this.items = response['content'];
          // fecha a janela do loading ...
          loading.dismiss();
          this.loadImageUrls();
        }, 
        error =>{
          // fecha a janela do loading ...
          loading.dismiss();
        });
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

  /** Função que cria o feito de loading ... */
  presentLoading() {
    const loading = this.loadingController.create({
      content: 'Aguarde...'
    });
    loading.present();

    return loading;
  }

  /** Função que cria o efeito de refresh (carregar) mais dados em uma páigna */
  doRefresh(refresher) {
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

}
