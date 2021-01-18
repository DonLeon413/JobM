//
//
//
//
export class SignInInfo{

  constructor( private userName: string, private token: string )
  {

  }

  public get UserName(): string{
    return this.userName;
  }

  public get Token(): string{
    return this.token;
  }
}
