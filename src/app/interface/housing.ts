import {Comment} from "./comment";
import {Address} from "./address";
import {Image} from "./image";

export interface Housing {
  likes: string[];
  address: Address;
  description: string;
  id: string;
  images: Image[];
  mainImage: {
    apiUri: string;
    id: string;
  };
  owner: string;
  price: number;
  surface: number;
  comments: Comment[];

}
