import {GetUser} from "./get-user";

export interface CreatedUser {
  id: string;
  activationUri: string;
  token: string;
}
