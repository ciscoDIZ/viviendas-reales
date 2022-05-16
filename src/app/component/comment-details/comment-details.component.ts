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
  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
  }

  onLike(): void {
    this.commentService.sendLike(this.comment.id).subscribe({
      next: (comment) => this.comment = comment,
      error: (response) => console.error(response.error.message)
    })
  }
}
