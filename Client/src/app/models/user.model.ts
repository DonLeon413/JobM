export class UserModel
{
    private _Id: string;
    private _UserName: string;
    private _SecondName: string;
    private _Phone: string;
    private _EMail: string;

    constructor( id: string = "",
                 userName: string = "",
                 secondName: string = "",
                 phone: string = "",
                 email: string = "" ) {

        this.UserName = userName;
        this.Id = id;
        this.SecondName = secondName;
        this.Phone = phone;
        this.EMail = email;            
    }

    get UserName(): string
    {
        return this._UserName;
    }

    set UserName( value: string)
    {
        this._UserName = value;
    }

    get SecondName(): string
    {
        return this._SecondName;    
    }

    set SecondName( value: string )
    {
        this._SecondName = value;    
    }

    get Phone(): string
    {
        return this._Phone;    
    }

    set Phone( value: string )
    {
        this._Phone = value;    
    }

    get EMail(): string
    {
        return this._EMail;    
    }

    set EMail( value: string )
    {
        this._EMail = value;    
    }

    get Id(): string
    {
        return this._Id;    
    }

    set Id( value: string )
    {
        this._Id = value;    
    }
}