import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../config/api.config";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { ProdutoDTO } from "../../models/produto.dto";


@Injectable()
export class ProdutoService{
    
    constructor(public http: HttpClient){
    }

    findById(idProduto: string){
        return this.http.get<ProdutoDTO>(`${API_CONFIG.BaseUrl}/produtos/${idProduto}`);
    }

    findByCategoria(idCategoria : string) {
        return this.http.get(`${API_CONFIG.BaseUrl}/produtos/?categorias=${idCategoria}`);
    }

    getSmallImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`;
        return this.http.get(url, {responseType : 'blob'});
    }  
    
    getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`;
        return this.http.get(url, {responseType : 'blob'});
    }

}