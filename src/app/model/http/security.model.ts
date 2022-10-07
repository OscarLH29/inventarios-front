import {environment} from '../../../environments/environment';

export interface ILoginReq {
  userName: string;
  password: string;
  systemCode: string;
  newPassword?: string;
}

export interface ILoginRes {
  token: string;
}
