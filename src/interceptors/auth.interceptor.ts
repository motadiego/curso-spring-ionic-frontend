import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { StorageService } from '../services/storage.service';
import { API_CONFIG } from '../config/api.config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public storage : StorageService){
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Passou no interceptor auth");
       
        let localUser = this.storage.getLocalUser();
        
        /** lógica utlizada para adicioanr o cabeçalho na requisição, apenas se a requisição for feita para a API 
         * 
         */
        let N = API_CONFIG.BaseUrl.length;
        let requestToAPI = req.url.substring(0,N) ==  API_CONFIG.BaseUrl;

        if(localUser && requestToAPI){
              const authReq = req.clone({ headers : req.headers.set('Authorization','Bearer ' + localUser.token ) });
              return next.handle(authReq);
        }else{
            return next.handle(req);
        }
    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};