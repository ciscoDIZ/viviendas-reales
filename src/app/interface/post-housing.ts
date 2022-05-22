import {Address} from "./address";

export interface PostHousing {
  id?: string;
  address: Address;
  description: string;
  owner: string;
  price: number;
  surface: number;
}
