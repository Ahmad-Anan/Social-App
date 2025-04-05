import { Component, inject, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommentsService } from '../../core/services/comments.service';
import { DatePipe } from '@angular/common';
import { IComments } from '../../core/interfaces/icomments';

@Component({
  selector: 'app-comment',
  standalone: true, // Added standalone since you're using Angular signals-like syntax
  imports: [NgbModule, FormsModule, ReactiveFormsModule, DatePipe], // Added ReactiveFormsModule
  templateUrl: './comment.component.html',
})
export class CommentComponent implements OnInit {
  private readonly commentsService = inject(CommentsService);
  @Input({ required: true }) postId!: string;
  commentId: IComments[] = [];
  commentGroup!: FormGroup;

  ngOnInit(): void {
    
    this.initializeForm();
    this.getPostComments();
  }

  initializeForm(): void {
    this.commentGroup = new FormGroup({
      content: new FormControl('', [Validators.required, Validators.minLength(2)]),
      post: new FormControl(this.postId, Validators.required),
    });
  }

  getPostComments(): void {
    this.commentsService.getPostComments(this.postId).subscribe({
      next: (res) => {
        this.commentId = res.comments;
      },
      error: (err) => {
        console.error( err);
      },
    });
  }

  sendComment(): void {
  

  
    this.commentsService.createComment(this.commentGroup.value).subscribe({
      next: (res) => {
        console.log( res);
        this.commentId = res.comments
        this.commentGroup.get('content')?.reset()
      },
      error: (err) => {
        console.error( err);
      },
    });
  }
  

    
}