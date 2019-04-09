import { Injectable } from "@angular/core";
import { StorageService } from "../storage.service";
import { Cart } from "../../models/cart";
import { ProdutoDTO } from "../../models/produto.dto";
import { ProdutoDetailPage } from "../../pages/produto-detail/produto-detail";

@Injectable()
export class CartService{

    constructor(public storage : StorageService){
    } 


    createOrClearCart() : Cart {
        let cart: Cart = {items: []};
        this.storage.setCart(cart);
        return cart;
    }   
    
    getCart() : Cart{
        let cart: Cart = this.storage.getCart();
        if(cart == null){
            cart = this.createOrClearCart();
        }
        return cart;
    }

    addProduto(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        
        // verifica se o produto ja foi adicionado no carrinho.  Caso negativo retorna -1
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if(position == -1){
            cart.items.push({quantidade: 1 , produto: produto }); // add o produto no carrinho
        }
        this.storage.setCart(cart); // atualiza o storage com o carrinho
        return cart;
    }




}