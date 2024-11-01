import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalAComponent } from './principal-a.component';

describe('PrincipalAComponent', () => {
  let component: PrincipalAComponent;
  let fixture: ComponentFixture<PrincipalAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrincipalAComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipalAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
