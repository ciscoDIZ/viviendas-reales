import {GetUser} from "./get-user";

export interface Comment {
  id: string;
  title: string;
  createdAt: Date;
  likes: string[];
  author: {
    surname: string;
    name: string;
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
