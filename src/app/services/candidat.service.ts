import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {

  
  private baseUrl = 'http://localhost:8080/api/v1/candidat'; // Adjust the base URL according to your backend

  constructor(private http: HttpClient) { }

  addCandidat(formData: FormData): Observable<any> {
    return this.http.post<any>(this.baseUrl, formData, {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data'
      })
    });
  }
}
