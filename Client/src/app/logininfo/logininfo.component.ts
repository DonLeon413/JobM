import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../__services/authentication.service';
import { EnvironmentService } from '../__services/environment.service';
import {ISignInStorageService} from '../__services/isigninstorage.service';

@Component({
  selector: 'app-logininfo',
  templateUrl: './logininfo.component.html',
  styleUrls: ['./logininfo.component.scss']
})
export class LoginInfoComponent implements OnInit
{
  UserName: string;

  constructor( private _signInStorage: ISignInStorageService,
               private _authenticationService: AuthenticationService,
               private _environments: EnvironmentService,
               private _Router: Router ) {
  }

  ngOnInit(): void {

    this._signInStorage.OnUserName.subscribe( ( userName: string ) => {

      this.UserName = userName;

    });

  }

  get UserImg():string {

    return this._environments.getValue( this._signInStorage.IsIsgnIn ? 
                                          'signin_user' : 'unknown_user' );

  }

  LogOut(): void{
    
    this._authenticationService.logout().subscribe(
      data =>{

        alert('SignOut OK!')
        this._Router.navigate( ["/"] );
      },
      error => {

        alert( "SignOut error! Description in console");
        console.log( error );
          
      } );

  }

  get IsSignIn(): boolean {

     return this._signInStorage.IsIsgnIn;
     
  }

}
