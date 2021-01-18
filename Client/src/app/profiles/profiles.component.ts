import {Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table'
import {fromEvent, of} from 'rxjs';

import { UserRowModel } from '../models/userrow.model';
import { AccountService } from '../__services/account.service';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter,
  subscribeOn
} from "rxjs/operators";
import { Observable } from 'rxjs';
import { ElementRef } from '@angular/core';
import { MatTableResponseModel } from '../models/mattableresponse.model';
import { RegisterModalComponent } from '../registermodal/register.modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserModel } from '../models/user.model';
import { UserModalComponent } from '../usermodal/user.modal.component';
import { ISignInStorageService } from '../__services/isigninstorage.service';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'profiles-component',
  styleUrls: ['profiles.component.scss'],
  templateUrl: 'profiles.component.html',
})
export class ProfilesComponent {

  DisplayedColumns = [ "name", "second_name", "email", "phone", "details" ];
  ActualPageLength = 0;
  SearchStr = "";
  IsSearching = false;
  SearchContext = "";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('movieSearchInput', { static: true }) movieSearchInput: ElementRef;

  dataSource = new MatTableDataSource<UserRowModel>([]);

  constructor( private _AccountService: AccountService,
               private _ISignInStorageServive: ISignInStorageService,
               public modalService: NgbModal ) {

  }
  
  ngAfterViewInit() {
  
    fromEvent(this.movieSearchInput.nativeElement, 'keyup').pipe(

      map( (event: any) => {
                return event.target.value;
          })


      , debounceTime( 500 )
      , distinctUntilChanged() )
      
      .subscribe( ( text: string ) => {      
                        console.log("search:" + text );
                        this.searchGetCall( text )
                        .subscribe( ( result ) => {},
                                    ( error ) => { this.ShowError( error ); } );
      });
    
      this.sort.sortChange.subscribe( () => {
                              this.paginator.firstPage();
                              this.Refresh();
                          });

      this.paginator.page.subscribe( () => {
                          this.Refresh() 
                        });

    this.Refresh()
      .subscribe( ( data ) => {},
                  ( error ) => { this.ShowError( error ); });
  }

  ShowError( error: any ) {
    
    console.log( error );
    alert('Error: details in console!')

  }

  searchGetCall( term: string ): Observable<any> {

    if( term && term.length > 0 && term.length <4 )
    {
        term = "";
    }

    if( this.SearchContext !== term )
    {
      this.SearchContext = term;
      return this.Refresh();
    }   
    return of<any>([]);
  }

  private Refresh(): Observable<any> {

    var result = this._AccountService.GetUsers( this.sort.active, this.sort.direction, 
                                   this.paginator.pageSize , this.paginator.pageIndex,
                                   this.SearchContext );
    result.subscribe(
        ( data: MatTableResponseModel<UserRowModel> ) =>{

            this.ActualPageLength = data.FilteredRowsCount;
            this.dataSource.data = data.Rows;

        },
        error => {
            
          this.ShowError( error );

        }
      )

      return result;
  }


  public get IsFilter(): boolean {

    return ( this.SearchContext && this.SearchContext.length > 3 );

  }

  public OnEdit( row: UserRowModel )
  {
    const modal_ref = this.modalService.open( UserModalComponent ); 
    modal_ref.componentInstance.Id = row.Id;
    modal_ref.componentInstance.Result.subscribe( ( result: UserModel ) => {
                      if( result !== null )
                      { // OK
                        this.Refresh();
                      }
                    });
  }
     
  public OnDelete( row: UserRowModel ): void
  {
     console.log( row  );
     if( confirm("Delete user: " + row.Name ) ) 
     { // Yes
        this._AccountService.DeleteUser( row.Id )
        .subscribe( ( data ) => {
                this.Refresh()
                .subscribe( (data) => {},
                            ( error ) =>{ this.ShowError( error ); } );
        },
        ( error ) => {
            this.ShowError( error );
        } );
      }
  }

  OnAddUser():void {

    const modalRef = this.modalService.open(RegisterModalComponent); 
    modalRef.componentInstance.result.subscribe( ( result ) => {
                      alert("Create new user - OK!");
                      this.Refresh();
                    });

  }
}

