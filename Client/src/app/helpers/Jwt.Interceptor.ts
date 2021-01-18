import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISignInStorageService } from '../__services/isigninstorage.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor( private _signInStorage: ISignInStorageService )
    {

    }

    intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    
        // add authorization header
        if( this._signInStorage.IsIsgnIn ) {

            let token = this._signInStorage.Token;
            
            if( token ) {
                
                console.log( "!!! JwtInterceptor: insert Bearer token !!!" );
                
                request = request.clone( {
                setHeaders: { 
                    Authorization: `Bearer ${token}`
                } } );
            }
        }

        return next.handle( request );

    }
    
}