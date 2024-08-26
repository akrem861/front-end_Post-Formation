import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormationModel } from '../models/FormationModel';
import { FormationModelpost } from '../models/FormationModelPost';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  private baseUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  getAllFormation(){
    const formationUrl = `${this.baseUrl}api/v1/formation`;
    return this.http.get<Array<FormationModel>>(formationUrl);
  }

  addFormation(formation:FormData){
    const formationUrl = `${this.baseUrl}api/v1/formation`;
    return this.http.post<any>(formationUrl,formation);
  }

  updateFormation(id:number,formation:FormData){
    const formationUrl = `${this.baseUrl}api/v1/formation/${id}`;
    return this.http.put<any>(formationUrl,formation);
  }

  deleteFormation(id:number){
    const formationUrl = `${this.baseUrl}api/v1/formation/${id}`;
    return this.http.delete<any>(formationUrl);
  }
}
