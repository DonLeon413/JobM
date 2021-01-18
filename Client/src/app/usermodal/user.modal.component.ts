import { Input, OnInit } from '@angular/core';
import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from '../__services/account.service';
import { MVCEx } from '../helpers/MVCEx';
import { UserModel } from '../models/user.model';
import { Subject } from 'rxjs/internal/Subject';



@Component({
  selector: 'app-modal',
  templateUrl: './user.modal.component.html',
  styleUrls: ['./user.modal.component.scss']
})
export class UserModalComponent {

    public userFG: FormGroup;
    public IsSubmit = false;
    public SubmitErrors: Array<String> = [];
    public Result: Subject<UserModel> = new Subject<UserModel>();
    public Id: string;
    
    constructor( public activeModal: NgbActiveModal,
                 private _AccountService: AccountService ) { 

      this.userFG = new FormGroup(
        { 'userName': new FormControl( "", Validators.required ),
          'email': new FormControl( "", [Validators.required, Validators.email]),                                      
          'secondName': new FormControl( "", Validators.required),
          'phone': new FormControl( "", [Validators.required] )          
        }
      );

    }
    
    get IsFormValid(): Boolean
    {
       return ( this.userFG.status === 'VALID' );
    }

    ngAfterViewInit() {

        this._AccountService.GetUser( this.Id )
           .subscribe( ( data: UserModel ) => { 
                                  this.userFG.patchValue( { "userName" : data.UserName } ); 
                                  this.userFG.patchValue( { "email" : data.EMail } ); 
                                  this.userFG.patchValue( { "secondName" : data.SecondName } ); 
                                  this.userFG.patchValue( { "phone" : data.Phone } ); 

                                },
                    ( error ) => { 
                                    alert("Error load!");
                                    console.log( error );
                                    this.activeModal.close('Close click')
                                    this.Result.next( null );
                                 } );       
    }

    OnOk() {
      
      this.userFG.controls["userName"].markAsTouched();
      this.userFG.controls["secondName"].markAsTouched();
      this.userFG.controls["email"].markAsTouched();
      this.userFG.controls["phone"].markAsTouched();

      if( false === this.IsFormValid )
      { // form invalid
         return;
      }  
      const request_model = new UserModel( this.Id,
                                           this.userFG.controls["userName"].value,
                                           this.userFG.controls["secondName"].value,
                                           this.userFG.controls["phone"].value,
                                           this.userFG.controls["email"].value );

      this.SubmitErrors = [];
      this.IsSubmit = true;
      this._AccountService.PutUser( request_model )
                .subscribe( result =>{

          this.IsSubmit = false;
          this.activeModal.close("Close click");
          this.Result.next( request_model );

      }, error =>{      

        this.IsSubmit = false;        

        alert( "User edit submit: error! Description in console");
        console.log( error );        

      });      
    }
}