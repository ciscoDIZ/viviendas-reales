import { Component, OnInit } from '@angular/core';
import {CommentService} from "../../../../service/comment.service";
import {Comment} from "../../../../interface/comment";
import {NgForm} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {PostComment} from "../../../../interface/post-comment";

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.scss']
})
export class EditCommentComponent implements OnInit {
  comment: Comment;
  updateComment: Comment
  id: string;
  constructor(
    private commentService: CommentService,
    private routes: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.routes.snapshot.params['id'];
    this.commentService.getById(this.id).subscribe({
      next: (comment) => {
        this.updateComment = comment
      },
      error: response => console.error(response.error.message)
    })
  }

  onSubmit(editComment: NgForm) {
    this.commentService.edit(this.id, <PostComment>editComment.value).subscribe(comment => this.updateComment = <Comment>comment)
  }
}
