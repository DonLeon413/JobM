using System;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;

namespace JobMApi.Models
{
    /// <summary>
    /// 
    /// </summary>
    public class ApplicationUser:
                IdentityUser
    {
        
        [MaxLength(20)]
        public String UserNameSecond
        {
            get;
            set;
        }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync( UserManager<ApplicationUser> manager, string authenticationType )
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync( this, authenticationType );
            // Add custom user claims here
            Debug.WriteLine( String.Format( "user:{0}", userIdentity.Name ) );
            return userIdentity;
        }
    }
}