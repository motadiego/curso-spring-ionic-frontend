import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../config/api.config";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";


@Injectable()
export class ProdutoService{
    
    constructor(public http: HttpClient){
    }

    findByCategoria(idCategoria : string) {
        return this.http.get(`${API_CONFIG.BaseUrl}/produtos/?categorias=${idCategoria}`);
    }

    getSmallImageFromBucket(id : string) : Observable<any> {
        console.log("Id do produto: " + id);
        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`;
        console.log("Url :" + url);
        return this.http.get(url, {responseType : 'blob'});
    }  
            
}