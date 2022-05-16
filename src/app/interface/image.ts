import { Comment } from "./comment";

export interface Image {
  id: string;
  title: string;
  apiUri: string;
  createdAt: Date;
  comments: Comment[];
}
