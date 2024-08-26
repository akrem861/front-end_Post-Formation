import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostCandidat } from '../models/PostCandidat';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl = 'http://localhost:8080/api/v1/post'; // Adjust the base URL according to your backend

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<PostCandidat[]> {
    return this.http.get<PostCandidat[]>(`${this.baseUrl}`);
  }

  getPost(id: number): Observable<PostCandidat> {
    return this.http.get<PostCandidat>(`${this.baseUrl}/${id}`);
  }

  addPost(post: PostCandidat): Observable<PostCandidat> {
    return this.http.post<PostCandidat>(`${this.baseUrl}`, post);
  }

  updatePost(id: number, post: PostCandidat): Observable<PostCandidat> {
    return this.http.put<PostCandidat>(`${this.baseUrl}/${id}`, post);
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
