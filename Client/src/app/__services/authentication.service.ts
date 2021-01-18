import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ISignInStorageService} from './isigninstorage.service';
import {EnvironmentService} from './environment.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  constructor( private _http: HttpClient,
               private _SignInStorage: ISignInStorageService,
               private _Environments: EnvironmentService) {

    console.log('AuthenticationService- ctor');
  }

  login(username: string, password: string, saveSignin: boolean ): Observable<any> {

    const body = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set( 'grant_type', 'password');

    const url = this._Environments.getValue('apiUrl') + '/Token';

    console.log(`url:${url}`);

    const res = this._http.post<any>(url, body.toString(),
      {

        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')

      });

    res.subscribe( data => {

        this._SignInStorage.SaveSignInInfo( data.userName, data.access_token,
                                              data.token_type, saveSignin );
                                              
    }, error =>{

      console.log( 'auth service login(): Error!');
      console.log(error);

    });

    return res;
  }

  logout(): Observable<any> {

    const url = this._Environments.getValue('apiUrl') + '/api/Account/Logout';

    const res = this._http.post<any>(url,
    {
      
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')

    });

    res.subscribe( data => {
      
      console.log('auth service logout(): OK');

      this._SignInStorage.DeleteSignInInfo();

    }, error =>{      
      console.log( '`auth service logout(): Error');
      console.log(error);
    });

    return res;    
    
  }
}
