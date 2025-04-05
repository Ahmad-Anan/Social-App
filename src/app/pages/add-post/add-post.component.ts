import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PostsService } from '../../core/services/posts.service';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [CommonModule, NgbModule, FormsModule],
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent {
  savedFile: File | undefined;
  content: string = '';
  errorMessage: string = '';

  constructor(private modalService: NgbModal, private postsService: PostsService) {}

  changeImage(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('Selected file:', file.name);
      this.savedFile = file;
    } else {
      console.log('No file selected');
    }
  }

  creatPost(): void {
    this.errorMessage = ''; // Reset error message

    const formData = new FormData();
    formData.append('body', this.content);
    if (this.savedFile) {
      formData.append('image', this.savedFile);
    }

    this.postsService.createPost(formData).subscribe({
      next: (res) => {
        console.log( res);
        this.modalService.dismissAll(); // Close modal on success
      },
      error: (err) => {
        console.log(err);
        
      }
    });
  }

  open(content: any): void {
    this.modalService.open(content);
  }


}