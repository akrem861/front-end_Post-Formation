import { Component, OnInit } from '@angular/core';
import { FormationService } from '../services/formation.service';
import { FormationModel } from '../models/FormationModel';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  formation?:any;

  constructor(private formationService:FormationService){

  }

  ngOnInit(): void {
   this.formationService.getAllFormation().subscribe({
    next:(data)=>{
      console.log(data.map(e=>e.formateurs));
      this.formation=data;
    }
   });
  }
  

}
