import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SectionComponent } from './section/section.component';
import { FormulaireFormateurComponent } from './formulaire-formateur/formulaire-formateur.component';
import { FormationComponent } from './formation/formation.component';
import { PostComponentComponent } from './post-component/post-component.component';
import { FormateurComponentComponent } from './formateur-component/formateur-component.component';

const routes: Routes = [
  {
    path: 'home',
    children: [
    { path: '', component: HeaderComponent, outlet: 'headrer' },
    { path: '', component: SectionComponent, outlet: 'section' }
    ]
    },

    {
        path:'signin',
        component:FormulaireFormateurComponent
    },

    {
        path:'formateurs',
        component:FormateurComponentComponent
    },

    {
        path:'post',
        component:PostComponentComponent
    },

    {
        path:'formation-admin',
        component:FormationComponent
    },
    {
        path:'formations',
        component:SectionComponent
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
