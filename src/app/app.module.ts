import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { FormulaireAdminComponent } from './formulaire-admin/formulaire-admin.component';
import { FormulaireFormateurComponent } from './formulaire-formateur/formulaire-formateur.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SectionComponent } from './section/section.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormationComponent } from './formation/formation.component';
import { PostComponentComponent } from './post-component/post-component.component';
import { FormateurComponentComponent } from './formateur-component/formateur-component.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    FormulaireAdminComponent,
    FormulaireFormateurComponent,
    HeaderComponent,
    NavbarComponent,
    SectionComponent,
    FormationComponent,
    PostComponentComponent,
    FormateurComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
