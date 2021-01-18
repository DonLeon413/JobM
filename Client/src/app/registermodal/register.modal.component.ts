import { Input, OnInit } from '@angular/core';
import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from '../__services/account.service';
import { MVCEx } from '../helpers/MVCEx';
import { RegisterModel } from '../models/register.model';
import { Subject } from 'rxjs/internal/Subject';



@Component({
  selector: 'app-modal',
  templateUrl: './register.modal.component.html',
  styleUrls: ['./register.modal.component.scss']
})
export class RegisterModalComponent implements OnInit{

    public registerForm: FormGroup;
    public IsSubmit = false;
    public SubmitErrors: Array<String> = [];
    result: Subject<boolean> = new Subject<boolean>();
    
    constructor( public activeModal: NgbActiveModal,
                 private _ProfileService: AccountService ) { 

      this.registerForm = new FormGroup(
        { "userName": new FormControl( "" ),
          "eMail": new FormControl("", [Validators.required, Validators.email]),                                      
          "password": new FormControl("", Validators.required),
          "confirmPassword": new FormControl("", [Validators.required])
        }, this.checkPassword.bind(this)
      );

    }

    checkPassword( formGroup: FormGroup ): any {
      
      const password = formGroup.controls["password"].value;
      const confirmPassword = formGroup.controls["confirmPassword"].value;
      
      return password === confirmPassword ? null : { notSame: true };

    } 
    
    get IsFormValid(): Boolean
    {
       return ( this.registerForm.status === "VALID" );
    }

    ngOnInit() {

    }

    OnRegister(){

      this.registerForm.controls["userName"].markAllAsTouched();
      this.registerForm.controls["eMail"].markAllAsTouched();
      this.registerForm.controls["password"].markAllAsTouched();
      this.registerForm.controls["confirmPassword"].markAllAsTouched();

      if( false === this.IsFormValid )
      { // form invalid
          return;  
      }

      const form_data = new RegisterModel( this.registerForm.controls["userName"].value,
                          this.registerForm.controls["eMail"].value,
                          this.registerForm.controls["password"].value,
                          this.registerForm.controls["confirmPassword"].value );

      this.IsSubmit = true;
      this._ProfileService.Register( form_data ).subscribe( result =>{

          this.IsSubmit = false;
          this.activeModal.close('Close click')

          this.result.next( true );

      }, error =>{                
        this.IsSubmit = false;

        alert( "Register user: error! Description in console");
        console.log( error );        
        

      });      
    }
}