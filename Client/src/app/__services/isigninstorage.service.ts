import {BehaviorSubject, Subject} from 'rxjs';

export abstract class ISignInStorageService {

  abstract get IsIsgnIn(): boolean;
  abstract SaveSignInInfo( userName: string, token: string, tokenType: string, saveSignin: boolean ): void;
  abstract DeleteSignInInfo(): void;

  abstract get OnUserName(): BehaviorSubject<string>;
  abstract get OnToken(): BehaviorSubject<string>;

  abstract get Token(): string;
  abstract get UserName(): string;

}
