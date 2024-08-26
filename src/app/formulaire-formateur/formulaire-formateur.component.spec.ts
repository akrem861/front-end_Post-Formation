import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireFormateurComponent } from './formulaire-formateur.component';

describe('FormulaireFormateurComponent', () => {
  let component: FormulaireFormateurComponent;
  let fixture: ComponentFixture<FormulaireFormateurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormulaireFormateurComponent]
    });
    fixture = TestBed.createComponent(FormulaireFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
