import {Component, OnInit} from '@angular/core';
import { AuthenticationService } from "../__services/authentication.service";
import {ISignInStorageService} from '../__services/isigninstorage.service';
import {ActivatedRoute, Router} from '@angular/router';
import { RegisterModalComponent } from '../registermodal/register.modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    LoginFG: FormGroup
    loading = false;
    returnUrl: string;

    constructor(private _AuthenticationService: AuthenticationService,
                private _ISignInStorage: ISignInStorageService,
                private _Route: ActivatedRoute,
                private _Router: Router,
                public _ModalService: NgbModal ){
                  
      this.LoginFG = new FormGroup( { "name": new FormControl( "", Validators.required ),
                                      "password": new FormControl( "", [Validators.required] ),          
                                      "save_signin": new FormControl( false ) } );
    }

    ngOnInit(): void {

    }

    get IsFormValid(): Boolean
    {
       return ( this.LoginFG.status === 'VALID' );
    }

    OnLogin(): void{
        this.loading = true;

        this.LoginFG.controls["name"].markAsTouched();
        this.LoginFG.controls["password"].markAsTouched();

        if( false === this.IsFormValid )
        { // form invalid
           return;
        } 

        this._AuthenticationService.login( this.LoginFG.controls["name"].value,
                                           this.LoginFG.controls["password"].value,
                                           this.LoginFG.controls["save_signin"].value ).
              subscribe( result => {

                this.loading = false;
                const redirect_url = this._Route.snapshot.queryParams['returnUrl'] || '/';
                console.log(`Redirect to: ${redirect_url}`);
                this._Router.navigate([redirect_url]);

              }, error => {

                this.loading = false;

                alert( "SignIn submit: error! Description in console");
                console.log( error );

          });
    }

    OpenRegisterModal() {
      const modalRef = this._ModalService.open(RegisterModalComponent);      
    }
}
