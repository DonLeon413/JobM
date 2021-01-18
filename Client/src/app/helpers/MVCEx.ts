export class MVCEx{
   
   public static GetErrors( modelState: any ): Array<String>
   {
       const result = new Array<String>();       
       
       const propStrings = Object.keys(modelState);
    
       propStrings.forEach( element => {

           var propErrors = modelState[element];
           propErrors.forEach( message =>{
               result.push( message );
           });
       });

       return result;
   } 
}