import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CORSInterceptor implements HttpInterceptor {

    constructor()
    {

    }

    intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    
                       
         console.log( "!!! CORSInterceptor: insert 'Access-Control-Allow-Origin': '*' !!!" );
                
         request = request.clone( {
                   setHeaders: { 
                       'Access-Control-Allow-Origin': '*'
                   } } );

        return next.handle( request );

    }
    
}