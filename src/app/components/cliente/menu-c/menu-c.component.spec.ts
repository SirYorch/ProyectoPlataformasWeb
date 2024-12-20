import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCComponent } from './menu-c.component';

describe('MenuCComponent', () => {
  let component: MenuCComponent;
  let fixture: ComponentFixture<MenuCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuCComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
