import { Component } from '@angular/core';
import { FormationService } from '../services/formation.service';
import { FormationModelpost } from '../models/FormationModelPost';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent {
  formations: any[] = [];
  showForm = false;
  editMode = false;
  currentFormationId: number | null = null;

  titre: string = '';
  date: string = '';
  heure: string = '';
  payant: boolean = false;
  montent: number = 0;
  lieu: string = '';
  description: string = '';
  themeFormation: string = '';

  success: string = '';
  error: string = '';

  selectedImage: File | null = null;


  

  constructor(private formationService: FormationService) { }

  ngOnInit(): void {
    this.loadFormations();
  }

  onImageSelected(event: any): void {
    this.selectedImage = event.target.files[0];
  }

  loadFormations(): void {
    this.formationService.getAllFormation().subscribe({
      next: (result) => {
        this.formations = result;
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
    this.titre = '';
    this.date = '';
    this.heure = '';
    this.payant = false;
    this.montent = 0;
    this.lieu = '';
    this.description = '';
    this.themeFormation = '';
    this.success = '';
    this.error = '';
    this.editMode = false;
    this.currentFormationId = null;
  }

  addFormation(): void {
    if (!this.selectedImage) {
      this.error = 'Please select an image.';
      return;
    }

    const formData = new FormData();
    formData.append('dtoFormation', new Blob([JSON.stringify(this.prepareFormation())], { type: 'application/json' }));
    formData.append('image', this.selectedImage);

    this.formationService.addFormation(formData).subscribe({
      next: (result) => {
        this.success = 'Formation added successfully';
        setTimeout(() => {
          this.loadFormations();
          this.toggleForm();
        }, 1000);
      },
      error: (err) => {
        this.error = err.error.errorMessage.join('\n');
      }
    });
  }

  editFormation(formation: any): void {
    this.resetForm();
    this.titre = formation.titre;
    this.date = formation.date;
    this.heure = formation.heure;
    this.payant = formation.payant==="yes"?true:false;
    this.montent = formation.montent==="Gratuit"?0:formation.montent.split(" DT")[0]
    this.lieu = formation.lieu;
    this.description = formation.description;
    this.themeFormation = formation.theme ? formation.theme.join(','):"";
    this.currentFormationId = formation.id;
    this.editMode = true;
    this.showForm = true;
  }

  updateFormation(): void {
  
    const formData = new FormData();
    formData.append('NewDtoFormation', new Blob([JSON.stringify(this.prepareFormation())], { type: 'application/json' }));

    if (this.selectedImage) {
        formData.append('image', this.selectedImage);
    }

    if (this.currentFormationId !== null) {
      this.formationService.updateFormation(this.currentFormationId, formData).subscribe({
        next: (result) => {
          this.success = 'Formation updated successfully';
          setTimeout(() => {
            this.loadFormations();
            this.toggleForm();
          }, 1000);
        },
        error: (err) => {
          this.error = err.error.errorMessage.join(' ');
        }
      });
    }
  }

  

  deleteFormation(id: number): void {
    if (confirm('Are you sure you want to delete this formation?')) {
      this.formationService.deleteFormation(id).subscribe({
        next: (result) => {
          this.success = 'Formation deleted successfully';
          setTimeout(() => {
            this.loadFormations(); // Reload formations
          }, 1000);
        },
        error: (err) => {
          if (err instanceof ErrorEvent) {
            console.log(err);
          } else {
            this.error = err.error.errorMessage.join(' ');
          }
        }
      });
    }
  }


  prepareFormation(): FormationModelpost {
    return {
      titre: this.titre,
      date: this.date,
      heure: this.heure,
      payant: this.payant,
      montent: this.montent,
      lieu: this.lieu,
      description: this.description,
      themeFormation: this.themeFormation.split(',')
    };
  }

}
