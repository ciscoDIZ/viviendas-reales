import {Address} from "./address";

export interface PostHousing {
  address: Address;
  description: string;
  owner: string;
  price: number;
  surface: number;
}
