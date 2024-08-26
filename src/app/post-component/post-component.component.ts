import { Component, OnInit } from '@angular/core';
import { PostCandidat } from '../models/PostCandidat';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-component',
  templateUrl: './post-component.component.html',
  styleUrls: ['./post-component.component.css']
})
export class PostComponentComponent implements OnInit {
  posts: PostCandidat[] = [];
  showForm = false;
  editMode = false;
  currentPostId: number | null = null;

  name: string = '';
  description: string = '';

  success: string = '';
  error: string = '';

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getAllPosts().subscribe({
      next: (result) => {
        this.posts = result;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetForm();
    }
  }

  resetForm(): void {
    this.name = '';
    this.description = '';
    this.success = '';
    this.error = '';
    this.editMode = false;
    this.currentPostId = null;
  }

  addPost(): void {
    const post: PostCandidat = {
      id: 0,
      name: this.name,
      description: this.description
    };

    this.postService.addPost(post).subscribe({
      next: (result) => {
        this.success = 'Post added successfully';
        this.loadPosts();
        this.toggleForm();
      },
      error: (err) => {
        this.error = err.error.errorMessage.join('\n');
      }
    });
  }

  editPost(post: PostCandidat): void {
    this.resetForm();
    this.name = post.name;
    this.description = post.description;
    this.currentPostId = post.id;
    this.editMode = true;
    this.showForm = true;
  }

  updatePost(): void {
    if (this.currentPostId !== null) {
      const post: PostCandidat = {
        id: this.currentPostId,
        name: this.name,
        description: this.description
      };

      this.postService.updatePost(this.currentPostId, post).subscribe({
        next: (result) => {
          this.success = 'Post updated successfully';
          this.loadPosts();
          this.toggleForm();
        },
        error: (err) => {
          this.error = err.error.errorMessage.join('\n');
        }
      });
    }
  }

  deletePost(id: number): void {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost(id).subscribe({
        next: () => {
          this.success = 'Post deleted successfully';
          this.loadPosts();
        },
        error: (err) => {
          this.error = err.error.errorMessage.join('\n');
        }
      });
    }
  }
}
