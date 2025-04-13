import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostsService } from '../../core/services/posts.service';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit {
  savedFile: File | undefined;
  content: string = ''; // Initialized as an empty string
  errorMessage: string = '';
  isLoading: boolean = false;
  allowedFileTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/svg+xml'];
  maxFileSize = 5 * 1024 * 1024; // 5MB

  constructor(private modalService: NgbModal, private postsService: PostsService) {}

  ngOnInit(): void {
    this.postsService.getMyPosts().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.error('Failed to load posts:', err);
      },
    });
  }

  changeImage(e: Event): void {
    const input = e.target as HTMLInputElement;
    this.errorMessage = '';
    this.savedFile = undefined;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      if (!this.allowedFileTypes.includes(file.type)) {
        this.errorMessage = 'Invalid file type. Please upload PNG, JPG, GIF, or SVG.';
        input.value = '';
        return;
      }

      if (file.size > this.maxFileSize) {
        this.errorMessage = 'File too large. Maximum size is 5MB.';
        input.value = '';
        return;
      }

      this.savedFile = file;
      console.log('Selected file:', file.name);
    }
  }

  createPost(form: NgForm): void {
    if (!form.valid || !this.content.trim()) {
      this.errorMessage = 'Please enter some content.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const formData = new FormData();
    formData.append('body', this.content.trim());
    if (this.savedFile) {
      formData.append('image', this.savedFile);
    }

    this.postsService.createPost(formData).subscribe({
      next: () => {
        this.isLoading = false;
        this.modalService.dismissAll();
        this.resetForm(form);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Failed to create post. Please try again.';
        console.error('Post creation error:', err);
      },
    });
  }

  open(content: TemplateRef<any>): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  private resetForm(form: NgForm): void {
    this.content = ''; // Reset to empty string
    this.savedFile = undefined;
    this.errorMessage = '';
    form.resetForm();
  }
}