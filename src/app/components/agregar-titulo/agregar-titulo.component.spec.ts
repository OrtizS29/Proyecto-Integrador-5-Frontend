import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTituloComponent } from './agregar-titulo.component';

describe('AgregarTituloComponent', () => {
  let component: AgregarTituloComponent;
  let fixture: ComponentFixture<AgregarTituloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarTituloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarTituloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
