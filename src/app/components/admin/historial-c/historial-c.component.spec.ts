import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialCComponent } from './historial-c.component';

describe('HistorialCComponent', () => {
  let component: HistorialCComponent;
  let fixture: ComponentFixture<HistorialCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialCComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
