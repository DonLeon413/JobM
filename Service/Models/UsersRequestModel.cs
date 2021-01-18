using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JobMApi.Models
{
    /// <summary>
    /// 
    /// </summary>
    public class UsersRequestModel
    {
        /// <summary>
        /// 
        /// </summary>
        public String SortColumn
        {
            get;
            set;
        }

        /// <summary>
        /// 
        /// </summary>
        public String SortDir 
        {
            get;
            set;
        }
        
        /// <summary>
        /// 
        /// </summary>
        public Int32 PagSize
        {
            get;
            set;
        }

        /// <summary>
        /// 
        /// </summary>
        public Int32 PageNum
        {
            get;
            set;
        }

        /// <summary>
        /// 
        /// </summary>
        public String Filter 
        { 
            get;
            set; 
        }
        
        /// <summary>
        /// Ctor default
        /// </summary>
        public UsersRequestModel()
        {

        }
    }
}