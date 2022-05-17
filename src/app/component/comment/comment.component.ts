import {Component, Input, OnInit} from '@angular/core';
import {Housing} from "../../interface/housing";
import {Image} from "../../interface/image";
import {CommentService} from "../../service/comment.service";
import {Comment} from "../../interface/comment";
import {Paginate} from "../../interface/paginate";
import {Session} from "../../interface/session";
import {NgForm} from "@angular/forms";
import {PostComment} from "../../interface/post-comment";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {User} from "../../interface/user";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input()
  parent: Housing | Image;
  @Input()
  instance: string
  @Input()
  session: Session;
  comments: Paginate<Comment>;
  postComment: PostComment;
  user: User;
  constructor(
    private commentService: CommentService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService
  ) { this.postComment = {author: '',content:''} }

  ngOnInit(): void {
    if (this.session) {
      this.userService.getById(this.session.id).subscribe({
        next: (user) => this.user = user
      })
    }

    const query = {housing: undefined, image: undefined};
    if (!this.instance) {
      this.instance = this.route.snapshot.params['instance'];
      this.authService.getSession().subscribe({
        next: (session) => this.session = session
      })
    }
    if (this.instance == 'housing'){
      query.housing = (this.parent) ? this.parent.id : this.route.snapshot.params['id'];
    }
    if (this.instance == 'image') {
      query.image = (this.parent) ? this.parent.id : this.route.snapshot.params['id'];
    }

    this.commentService.getAll(query).subscribe({
      next: (comments) => this.comments = comments,
      error: (response) => console.error(response.error.message)
    })
  }

  onSubmit() {
    this.postComment.author = this.session.id;
    if (this.instance == 'image') {
      this.postComment.image = (this.parent) ? this.parent.id : this.route.snapshot.params['id'];
    }
    if (this.instance == 'housing') {
      this.postComment.housing = (this.parent) ? this.parent.id : this.route.snapshot.params['id'];
    }
    this.commentService.save(this.postComment).subscribe({
      next: comment => {
        this.comments.list.push(comment);
        this.postComment.content = '';
        this.postComment.title = '';
      },
      error: response => console.log(response.error.message)
    })
  }
}
