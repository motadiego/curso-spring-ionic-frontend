import { Injectable } from "@angular/core";
import { StorageService } from "../storage.service";
import { Cart } from "../../models/cart";
import { ProdutoDTO } from "../../models/produto.dto";

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

    removeProduto(produto: ProdutoDTO): Cart{
        let cart = this.getCart();
        
        // verifica se o produto está no carrinho
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if(position != -1){
            cart.items.splice(position , 1); // remove o produto no carrinho
        }
        this.storage.setCart(cart); // atualiza o storage com o carrinho
        return cart
    }


    increaseQuantity(produto: ProdutoDTO): Cart{
        let cart = this.getCart();
        
        // verifica se o produto está no carrinho
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if(position != -1){
            cart.items[position].quantidade++; // incrementwa a quantidade do item (produto) no carrinho
        }
        this.storage.setCart(cart); // atualiza o storage com o carrinho
        return cart
    }

    
    decreaseQuantity(produto: ProdutoDTO): Cart{
        let cart = this.getCart();
        
        // verifica se o produto está no carrinho
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if(position != -1){
            cart.items[position].quantidade--; // diminui a quantidade do item (produto) no carrinho

            if(cart.items[position].quantidade < 1){
                cart = this.removeProduto(produto);
            }

        }
        this.storage.setCart(cart); // atualiza o storage com o carrinho
        return cart
    }
     
    total(): number{
        let cart = this.getCart();
        let sum = 0;
        for (var i=0; i < cart.items.length; i++) {
            let item = cart.items[i];
            sum +=  item.produto.preco * item.quantidade;
        }                
       return sum; 
    }

}