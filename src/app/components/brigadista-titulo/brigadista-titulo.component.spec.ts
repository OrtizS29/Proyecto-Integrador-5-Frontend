import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrigadistaTituloComponent } from './brigadista-titulo.component';

describe('BrigadistaTituloComponent', () => {
  let component: BrigadistaTituloComponent;
  let fixture: ComponentFixture<BrigadistaTituloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrigadistaTituloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrigadistaTituloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
