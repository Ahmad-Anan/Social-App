import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostsService } from '../../core/services/posts.service';
import { IPosts } from '../../core/interfaces/iposts';
import { CommentComponent } from "../comment/comment.component";
import { AddPostComponent } from "../add-post/add-post.component";

@Component({
  selector: 'app-time-line',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, CommentComponent, AddPostComponent],
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.scss']
})
export class TimeLineComponent implements OnInit{

private readonly postsService = inject(PostsService);
postsId : IPosts[] = [];

ngOnInit(): void {
  this.getAllPosts();
}
getAllPosts(){
  this.postsService.getAllPosts().subscribe({
    next: (res) => {
      // console.log(res.posts);
      this.postsId = res.posts
    },
    error: (err) => {console.log(err)},
  })
};

}