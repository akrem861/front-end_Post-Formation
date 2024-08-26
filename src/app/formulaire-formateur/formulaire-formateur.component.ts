import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostCandidat } from '../models/PostCandidat';
import { PostService } from '../services/post.service';
import { CandidatService } from '../services/candidat.service';
import { FormateurService } from '../services/formateur.service';

@Component({
  selector: 'app-formulaire-formateur',
  templateUrl: './formulaire-formateur.component.html',
  styleUrls: ['./formulaire-formateur.component.css']
})
export class FormulaireFormateurComponent implements OnInit {

  posts: PostCandidat[] = [];
  isFormateur: boolean = false;
  formData: any = {
    nom: '',
    prenom: '',
    adresse: '',
    email: '',
    password: '',
    telephone: '',
    post_name: null,
    specialites: '',
    cv: null,
    photo: null
  };

  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private postService: PostService,
    private candidatService: CandidatService,
    private formateurService: FormateurService
  ) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getAllPosts().subscribe((data) => {
      this.posts = data;
    });
  }

  onFileSelected(event: any, fieldName: string): void {
    const file = event.target.files[0];
    if (fieldName === 'cv') {
      this.formData.cv = file;
    } else if (fieldName === 'photo') {
      this.formData.photo = file;
    }
  }

  onSubmit(): void {
    const jsonData = {
        nom: this.formData.nom,
        prenom: this.formData.prenom,
        adresse: this.formData.adresse,
        email: this.formData.email,
        password: this.formData.password,
        telephone: this.formData.telephone,
        post_name: this.formData.post_name,
        specialite_formateur: this.formData.specialites.split(',')
    };

    const formData = new FormData();
    formData.append('user', new Blob([JSON.stringify(jsonData)], { type: 'application/json' }));

    if (this.isFormateur) {
        if (this.formData.cv) {
            formData.append('cv', this.formData.cv);
        }else{
          this.errorMessage = "le cv formateur ne peut pas être vide ! !!"
          return;
        }

        if (this.formData.photo) {
            formData.append('image', this.formData.photo);
        }
        else{
          this.errorMessage = "image formateur ne peut pas être vide ! !!"
          return;
        }
        this.formateurService.addFormateur(formData).subscribe({
            next: (response) => {
                this.successMessage = 'Formateur saved successfully!';
                this.errorMessage = '';
            },
            error: (err) => {
                this.successMessage = '';
                this.errorMessage = err.error.errorMessage.join(',  ');
            }
        });
    } else {
        if (this.formData.photo) {
            formData.append('image', this.formData.photo);
        }
        else{
          this.errorMessage = "image candidat ne peut pas être vide ! !!"
          return;
        }
        this.candidatService.addCandidat(formData).subscribe({
            next: (response) => {
                this.successMessage = 'Candidat saved successfully!';
                this.errorMessage = '';
            },
            error: (err) => {
                this.successMessage = '';
                this.errorMessage = err.error.errorMessage.join(',  ');
            }
        });
    }
}

}
