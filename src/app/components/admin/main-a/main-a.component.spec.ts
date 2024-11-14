import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAComponent } from './main-a.component';

describe('MainAComponent', () => {
  let component: MainAComponent;
  let fixture: ComponentFixture<MainAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainAComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
