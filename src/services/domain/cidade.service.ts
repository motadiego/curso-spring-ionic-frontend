import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { CidadeDTO } from "../../models/cidade.dto";
import { Observable } from "rxjs";

@Injectable()
export class CidadeService{
    
    constructor(public http: HttpClient){
    }

    /**
     * Retorna uma lista do tipo CidadeDTO
    */
    findAll(idEstado: string) : Observable<CidadeDTO[]> {
      return this.http.get<CidadeDTO[]>(`${API_CONFIG.BaseUrl}/estados/${idEstado}/cidades`);
    }
}    