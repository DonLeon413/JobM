using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace JobMApi.Models
{
    /// <summary>
    /// 
    /// </summary>
    public static class IQueryableEX
    {
        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="TEntity"></typeparam>
        /// <param name="source"></param>
        /// <param name="orderByProperty"></param>
        /// <param name="desc"></param>
        /// <returns></returns>
        public static IQueryable<TEntity> OrderBy<TEntity>( this IQueryable<TEntity> source, 
                                                            String orderByProperty, String desc )
        {
            String command = ( String.Compare( desc, "desc", true ) == 0 ? 
                                               "OrderByDescending" : "OrderBy" );

            var type = typeof( TEntity );

            var property = type.GetProperty( orderByProperty );

            var parameter = Expression.Parameter( type, "p" );

            var propertyAccess = Expression.MakeMemberAccess( parameter, property );
            var orderByExpression = Expression.Lambda( propertyAccess, parameter );
            var resultExpression = Expression.Call( typeof( Queryable ), command, 
                                                    new Type[] { type, property.PropertyType },
                                                    source.Expression, 
                                                    Expression.Quote( orderByExpression ) );

            return source.Provider.CreateQuery<TEntity>( resultExpression );
        }
    }
}