using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JobMApi.Models
{
    /// <summary>
    /// 
    /// </summary>
    public class UserRowModel
    {
        /// <summary>
        /// 
        /// </summary>
        [JsonProperty( PropertyName = "name" )]
        public String Name 
        {
            get;
            set;
        }

        /// <summary>
        /// 
        /// </summary>
        [JsonProperty( PropertyName = "email" )]
        public String EMail 
        {
            get;
            set;
        }

        [JsonProperty( PropertyName = "second_name" )]
        public String SecondName
        {
            get;
            set;
        }

        [JsonProperty( PropertyName = "phone" )]
        public String Phone
        {
            get;
            set;
        }

        /// <summary>
        /// 
        /// </summary>
        [JsonProperty( PropertyName = "id" )]
        public String Id 
        {
            get;
            set;
        }
    }
}