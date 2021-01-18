export class RegisterModel
{
    public set UserName( value: string ) {
        this._UserName = value;
    }

    public get UserName(): string {
        return this._UserName;
    }

    public set EMail( value: string ) {
        this._EMail = value;
    }

    public get EMail(): string {
        return this._EMail;       
    }

    public set Password( value: string ){
        this._Password = value;
    }

    public get Password(): string{
        return this._Password;
    }

    public set ConfirmPassword( value: string ){
        this._ConfirmPassword = value;
    }

    public get ConfirmPassword(): string{
        return this._ConfirmPassword;
    }

    constructor( private _UserName: string = null,
                 private _EMail: string = null,
                 private _Password: string = null,
                 private _ConfirmPassword: string = null ) {
    }
}