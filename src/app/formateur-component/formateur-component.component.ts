import { Component, OnInit } from '@angular/core';
import { Formateur } from '../models/Formateur';
import { FormateurService } from '../services/formateur.service';

@Component({
  selector: 'app-formateur-component',
  templateUrl: './formateur-component.component.html',
  styleUrls: ['./formateur-component.component.css']
})
export class FormateurComponentComponent implements OnInit {
  formateurs: Formateur[] = [];
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private formateurService: FormateurService) { }

  ngOnInit(): void {
    this.loadFormateurs();
  }

  loadFormateurs(): void {
    this.formateurService.getAllFormateurs().subscribe({
      next: (data) => this.formateurs = data,
      error: (err) => this.errorMessage = 'Error loading formateurs: ' + err.message
    });
  }

  deleteFormateur(id: number): void {
    if (confirm('Are you sure you want to delete this formateur?')) {
      this.formateurService.deleteFormateur(id).subscribe({
        next: () => {
          this.successMessage = 'Formateur deleted successfully!';
          this.errorMessage = '';
          this.loadFormateurs(); // Refresh the list
        },
        error: (err) => {
          this.successMessage = '';
          console.log(err);
          this.errorMessage = 'Error deleting formateur: ' + err.message;
        }
      });
    }
  }
}
