import { UserRowModel } from "./userrow.model";

export class MatTableResponseModel<TDataItem>
{
    constructor( public FilteredRowsCount: number, public Rows: Array<UserRowModel> )
    {        
    }
}