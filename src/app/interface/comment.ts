import {GetUser} from "./get-user";

export interface Comment {
  id: string;
  title: string;
  author: {
    id: string;
    email: string;
    avatar: string
  };
  content: string;
  housing: string;
  answers: [
    {
      author: {
        id: string;
        email: string;
        avatar: string;
      };
      content: string;
    }
  ]
}
