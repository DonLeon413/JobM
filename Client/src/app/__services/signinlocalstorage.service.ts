import {ISignInStorageService} from './isigninstorage.service';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

enum LSKeys {
  UserName = 'auth_UserName',
  Token = 'auth_Token',
  TokenType= 'auth_TokenType'
}

@Injectable({ providedIn: 'root' })
export class SignInLocalStorageService extends ISignInStorageService{

  public OnUserName =  new BehaviorSubject<string>('');
  public OnToken = new BehaviorSubject<string>('');

  private _userName;
  private _token;
  private _tokenType;

  constructor()
  {

    super();
    
    this._userName = localStorage.getItem( LSKeys.UserName );
    this._token = localStorage.getItem( LSKeys.Token );
    this._tokenType = localStorage.getItem( LSKeys.TokenType );

  }

  get IsIsgnIn(): boolean {

    return ( this._token !== null );

  }

  public SaveSignInInfo( userName: string, token: string, tokenType: string,
                  saveSignin: boolean ) {

    if( saveSignin ) {                  

      localStorage.setItem( LSKeys.UserName, userName );
      localStorage.setItem( LSKeys.Token, token );
      localStorage.setItem( LSKeys.TokenType, tokenType );
      
    }

    this.UserName = userName;
    this.Token = token;
    this._tokenType = tokenType;

  }

  DeleteSignInInfo(): void
  {

    localStorage.removeItem(LSKeys.UserName );
    localStorage.removeItem(LSKeys.Token );
    localStorage.removeItem(LSKeys.TokenType );
    this.Token = null;
    this._tokenType = null;
    this.UserName = null;

  }

  set UserName( value: string) {
    
    if ( value !== this._userName ) {

      this._userName = value;
      this.OnUserName.next(value);

    }
  }

  get UserName(): string {

      return this._userName;

  }

  set Token( value: string ) {

    if ( value !== this._token ) {
      this._token = value;
      this.OnToken.next(value);
    }

  }

  get Token(): string {
    return this._token;
  }

  get TokenType(): string
  {

    return this._tokenType;

  }
}
