using JobM_NET.Models;
using JobMApi.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Mvc;
using AuthorizeAttribute = System.Web.Http.AuthorizeAttribute;
using HttpPostAttribute = System.Web.Http.HttpPostAttribute;
using RoutePrefixAttribute = System.Web.Http.RoutePrefixAttribute;

namespace JobMApi.Controllers
{
    [Authorize]
    [RoutePrefix( "api/Profiles" )]    
    public class ProfilesController:ApiController
    {

        public ProfilesController()
        {
        }

 
        // POST api/<controller>
        [HttpPost]
        [Authorize]
        public MatTableResponseModel<UserRowModel> Users( UsersRequestModel model )
        {

            using( var context = new ApplicationDbContext() )
            {
                IQueryable<ApplicationUser> query = context.Users;

                //  set filter
                if( !String.IsNullOrWhiteSpace( model.Filter ) )
                {
                    String filter = model.Filter.Trim();
                    query = context.Users.Where( i => ( i.Email.Contains( filter ) ||
                                                i.UserName.Contains( filter ) ) );
                }

                var filtered_rows = query.Count();

                var map = new Dictionary<String, String>() { { "id", "Id" },
                                                             { "email", "Email" },
                                                             { "name", "UserName" } };
                // sort                                
                var sort_column = ( map.ContainsKey( model.SortColumn ) ?
                                            map[model.SortColumn] : "" );
                String column_sort = ( String.IsNullOrWhiteSpace( sort_column ) ? 
                                                    "Id" : sort_column );
                String dir_sort = ( String.IsNullOrWhiteSpace( model.SortDir ) ?
                                                    "asc" : model.SortDir );

                query = query.OrderBy( column_sort, dir_sort );                                

                var data_page = query.Skip( ( model.PageNum ) * model.PagSize )
                                     .Take( model.PagSize );

                var data = data_page.ToList()
                            .Select( i => new UserRowModel()
                                   {
                                       EMail = i.Email,
                                       Name = i.UserName,
                                       SecondName = i.UserNameSecond,
                                       Phone = i.PhoneNumber,
                                       Id = i.Id
                                   } );

                return new MatTableResponseModel<UserRowModel>( filtered_rows, data );
            }
        }

        // GET api/<controller>/5
        [Authorize]
        [System.Web.Http.HttpGet]
        public UserModel Get( String Id )
        {
            using( var context = new ApplicationDbContext() )
            {
                ApplicationUser user = context.Users
                                               .Where( i => String.Compare( i.Id, Id, true ) == 0 )
                                               .First();
                if( null == user )
                {
                    throw new Exception( "Unknown user." );
                }

                UserModel result = new UserModel()
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    SecondName = user.UserNameSecond,
                    EMail = user.Email,
                    Phone = user.PhoneNumber
                };

               return result;
            }
        }
        
        // POST api/<controller>
        // public void Post( [FromBody] string value )
        // {
        // }

        // PUT api/<controller>/5
        [System.Web.Http.HttpPut]
        public IHttpActionResult Put(  UserModel bodyModel )
        {
            if( !ModelState.IsValid )
            {
                return BadRequest( ModelState );
            }

            using( var context = new ApplicationDbContext() )
            {
                // 1)  загрузка нужного пользователя
                ApplicationUser update_user = context.Users
                                                     .Where( u => u.Id == bodyModel.Id )
                                                     .First();
                if( null == update_user )
                { // а пользователя то нет :((
                    return BadRequest( "Unknown user." );
                }

                foreach( var user in context.Users
                                             .Where( u => u.UserName == bodyModel.UserName ||
                                                     u.Email == bodyModel.EMail ) )
                {
                    if( user.Id != bodyModel.Id )
                    {
                        return BadRequest( "Bad second name or e-mail." );
                    }
                }

                update_user.UserName = bodyModel.UserName;
                update_user.UserNameSecond = bodyModel.SecondName;
                update_user.PhoneNumber = bodyModel.Phone;
                update_user.Email = bodyModel.EMail;

                context.SaveChanges();

                return Ok();
            }             
        }

        // DELETE api/<controller>/5
        [System.Web.Http.HttpDelete]
        public void Delete( String id )
        {
            using( var context = new ApplicationDbContext() )
            {
                ApplicationUser user = new ApplicationUser()
                {
                    Id = id
                };

                context.Users.Attach( user );
                context.Users.Remove( user );
                context.SaveChanges();
            }
        }
    }
}