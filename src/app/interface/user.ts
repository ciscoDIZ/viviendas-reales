import {Housing} from "./housing";

export interface User {
  id: string;
  name: string;
  surname: string
  avatar: string;
  email: string;
  residence: string;
  housings: Housing[];

}
