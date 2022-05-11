import {Comment} from "./comment";

export interface Housing {
  address: {
    state: string;
    province: string;
    name: string;
    road: string;
    number: string;
    floor: string;
  }
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
