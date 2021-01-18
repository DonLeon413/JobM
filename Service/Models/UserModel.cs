using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace JobMApi.Models
{
    /// <summary>
    /// 
    /// </summary>
    public class UserModel
    {
        /// <summary>
        /// 
        /// </summary>
        [Required]
        [MaxLength( 128 )]
        [JsonProperty( PropertyName = "id" )]
        public String Id
        {
            get;
            set;
        }

        /// <summary>
        /// 
        /// </summary>
        [Required]
        [JsonProperty( PropertyName = "user_name")]
        [StringLength( 100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 3 )]
        public String UserName
        {
            get;
            set;
        }

        /// <summary>
        /// 
        /// </summary>
        [Required]
        [MaxLength(256)]
        [JsonProperty( PropertyName = "second_name" )]
        public String SecondName
        {
            get;
            set;
        }

        /// <summary>
        /// 
        /// </summary>
        [Required]
        [MaxLength(256)]
        [JsonProperty( PropertyName = "email" )]
        public String EMail 
        {
            get;
            set;
        }

        /// <summary>
        /// 
        /// </summary>
        [Required]
        [MaxLength( 256 )]
        [JsonProperty( PropertyName = "phone_number" )]
        public String Phone
        {
            get;
            set;
        }


        /// <summary>
        /// Ctor default
        /// </summary>
        public UserModel() 
        {
        }
    }
}