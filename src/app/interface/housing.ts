import {Comment} from "./comment";
import {Address} from "./address";

export interface Housing {
  address: Address;
  description: string;
  id: string;
  images: [
    {
      title: string;
      apiUri: string;
      id: string;
    }
  ]
  mainImage: {
    apiUri: string;
    id: string;
  };
  owner: string;
  price: number;
  surface: number;
  comments: Comment[];

}
