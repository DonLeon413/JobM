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
    public class MatTableResponseModel<TRow>
    {
        /// <summary>
        /// 
        /// </summary>
        [JsonProperty( PropertyName = "filtered_rows_count" )]
        public Int32 FilteredRowsCount 
        {
            get;
            private set;
        }

        /// <summary>
        /// 
        /// </summary>
        [JsonProperty( PropertyName = "data" )]
        public IEnumerable<TRow> Data
        {
            get;
            private set;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="filterdRowsCount"></param>
        /// <param name="data"></param>
        public MatTableResponseModel( Int32 filterdRowsCount, IEnumerable<TRow> data )
        {
            this.Data = data;
            this.FilteredRowsCount = filterdRowsCount;
        }

    }
}