import {Component, Input, OnInit} from '@angular/core';
import {CommentComponent} from "../comment/comment.component";
import {Comment} from "../../interface/comment";
import {CommentService} from "../../service/comment.service";
import {Session} from "../../interface/session";

@Component({
  selector: 'app-comment-details',
  templateUrl: './comment-details.component.html',
  styleUrls: ['./comment-details.component.scss']
})
export class CommentDetailsComponent implements OnInit {

  @Input()
  comment: Comment
  @Input()
  session: Session;
  @Input()
  likes: string[];
  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
  }

  onLike(id: string): void {
    if (this.comment.likes.map(m => m.toString()).find(f => f === id)) {
      this.removeLike();
      return;
    }
    this.addLike();
  }

  addLike(): void {
    this.commentService.sendLike(this.comment.id).subscribe({
      next: (comment) => this.comment = comment,
      error: (response) => console.error(response.error.message)
    })
  }
  removeLike(): void {
    this.commentService.sendDislike(this.comment.id).subscribe({
      next: (comment) => this.comment = comment,
      error: (response) => console.error(response.error.message)
    });
  }

  isSessionLike(session: Session) {
    console.log(session)
    if (session) {
      return !!this.comment.likes.map(userID => userID.toString()).find(user => user == session.id);
    }
    return false;

  }
}
