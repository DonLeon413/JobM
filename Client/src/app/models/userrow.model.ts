export class UserRowModel {

    constructor( private _Id: string = "", private _Name: string = "", 
                 private _EMail: string = "", 
                 private _SecondName: string = "" ,
                 private _Phone: string = "" ) {
    }

    public get Name(): string {
        
        return this._Name;

    }

    public get EMail(): string {

        return this._EMail;

    }

    public get Id(): string {

        return this._Id;

    }

    public get SecondName(): string {

        return this._SecondName;

    } 

    public get Phone(): string {

        return this._Phone;

    }

}
