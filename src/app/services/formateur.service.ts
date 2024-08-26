import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Formateur } from '../models/Formateur';

@Injectable({
  providedIn: 'root'
})
export class FormateurService {
  private baseUrl = 'http://localhost:8080/api/v1/formateur'; // Adjust the base URL according to your backend
  private baseUrlDelete = 'http://localhost:8080/api/v1/user'; // Adjust the base URL according to your backend

  constructor(private http: HttpClient) { }

  addFormateur(formData: FormData): Observable<any> {
    return this.http.post<any>(this.baseUrl, formData, {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data'
      })
    });
  }


  getAllFormateurs(): Observable<Formateur[]> {
    return this.http.get<Formateur[]>(`${this.baseUrl}`);
  }

  deleteFormateur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrlDelete}/${id}`);
  }
}
