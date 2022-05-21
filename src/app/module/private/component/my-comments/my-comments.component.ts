import { Component, OnInit } from '@angular/core';
import {CommentService} from "../../../../service/comment.service";
import {Paginate} from "../../../../interface/paginate";
import {Comment} from "../../../../interface/comment";
import {AuthService} from "../../../../service/auth.service";
import {Session} from "../../../../interface/session";

@Component({
  selector: 'app-my-comments',
  templateUrl: './my-comments.component.html',
  styleUrls: ['./my-comments.component.scss']
})
export class MyCommentsComponent implements OnInit {
  comments: Paginate<Comment>;
  session: Session;
  page: number;
  pageSize: number;
  total: number;
  successMessage: string;
  private errorMessage: string;
  constructor(private commentService: CommentService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getSession().subscribe({
      next: (session) => {
        this.session = session;
        this.getComments(session);
      }
    });

  }

  private getComments(session: Session) {
    this.commentService
      .getAll({author: session.id})
      .subscribe(comments => {
        this.comments = comments;
        this.total = this.comments.pagination.total;
        this.page = this.comments.pagination.page;
        this.pageSize = this.comments.pagination.limit;
        console.log(this.comments.list)
      });
  }

  pageChanged($event: number) {
    if (!$event) {
      $event = 1;
    }
    this.page = $event;
    this.commentService.getAll(`?author=${this.session.id}&page=${this.page}`).subscribe({
      next: comments => this.comments = comments,
      error: response => console.error(response.error.message)
    })
  }

  onRemove(id: string): void {
    this.commentService.delete(id).subscribe({
      next: () => {
        this.successMessage = 'remove comment success';
        this.getComments(this.session)
      },
      error: () => this.errorMessage = 'cant remove comment whit id '+id
    })
  }
}
