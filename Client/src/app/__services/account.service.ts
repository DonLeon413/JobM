import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { MatTableResponseModel } from "../models/mattableresponse.model";
import { RegisterModel } from "../models/register.model";
import { UserModel } from "../models/user.model";
import { UserRowModel } from "../models/userrow.model";
import { EnvironmentService } from "./environment.service";

@Injectable({ providedIn: 'root' })
export class AccountService {

  constructor( private http: HttpClient,
               private environments: EnvironmentService ) {
  }

  GetUsers( sortColumn: string, sortDir: string, pageSize: number, 
            pageNum: number, filter: string = "" ): Observable<MatTableResponseModel<UserRowModel>> {

    const body = new HttpParams()
          .set('sortcolumn', sortColumn )
          .set('sortDir', sortDir )
          .set('pagSize', pageSize.toString() )
          .set('pageNum', pageNum.toString() )
          .set('filter', filter )


    const url = this.environments.getValue( 'apiUrl' ) + '/api/Profiles';

    const result = this.http.post<any>( url, body.toString(),
    {
      
        headers: new HttpHeaders()
              .set('Content-Type', 'application/x-www-form-urlencoded')              
    })
    .pipe(

      map( ( data ) =>{
          
          const new_rows = new Array<UserRowModel>();
          if( data.data && data.data.length > 0 )
          {
             data.data.forEach(element => {
                new_rows.push( new UserRowModel( element.id, element.name, element.email,
                                                 element.second_name, element.phone ) );
             });
          }
          return new MatTableResponseModel<UserRowModel>( data.filtered_rows_count, new_rows );
      })
    );

    return result;

  }

  Register( model: RegisterModel ): Observable<any> {

    const body = new HttpParams()
          .set('username', model.UserName )
          .set('email', model.EMail )
          .set('password', model.Password )
          .set( 'confirmpassword', model.ConfirmPassword );

    const url = this.environments.getValue( 'apiUrl' ) + '/api/Account/Register';

    const result = this.http.post<any>( url, body.toString(),
      {

        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')          

      });

    return result;
  } 

  DeleteUser( id: string ): Observable<any> {

    const url = this.environments.getValue( 'apiUrl' ) + '/api/Profiles';

    let httpParams = new HttpParams().set('id', id );
    
    let options = { 

      params: httpParams,
      headers: new HttpHeaders( {

        'Content-Type': 'application/x-www-form-urlencoded',

      }), 
    };

    const result = this.http.delete<any>( url, options );

    return result;

  }

  PutUser( model: UserModel ): Observable<any>
  {
    const body = new HttpParams()
    .set( "id", model.Id )
    .set('username', model.UserName )
    .set('secondname', model.SecondName )
    .set('email', model.EMail )
    .set('phone', model.Phone );
    
    const url = this.environments.getValue( 'apiUrl' ) + '/api/Profiles';

    const result = this.http.put<any>( url, body,
                { headers: new HttpHeaders()
                  
                      .set('Content-Type', 'application/x-www-form-urlencoded')
                      
                });

    return result;
  }

  GetUser( id: string ): Observable<UserModel>
  {
    const params = new HttpParams()
    .set( "id", id );

    const url = this.environments.getValue( 'apiUrl' ) + '/api/Profiles';

    const result = this.http.get<any>( url,
                { headers: new HttpHeaders()
                      .set('Content-Type', 'application/x-www-form-urlencoded'),                      
                 params: params
                })
                .pipe(
      
                  map( ( data ) =>{
                      
                      const model = new UserModel( data.id, data.user_name, data.second_name,
                                                   data.phone_number, data.email );
                      return model;
                  })
                );

    return result;

  }
}