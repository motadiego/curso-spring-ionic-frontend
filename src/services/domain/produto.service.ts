import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../config/api.config";
import { HttpClient } from "@angular/common/http";


@Injectable()
export class ProdutoService{
    
    constructor(public http: HttpClient){
    }

    /**
     * Retorna uma lista do tipo ProdutoDTO
    */
    findByCategoria(idCategoria : string) {
        return this.http.get(`${API_CONFIG.BaseUrl}/produtos/?categorias=${idCategoria}`);
    }
}