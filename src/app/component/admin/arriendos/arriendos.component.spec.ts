import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArriendosComponent } from './arriendos.component';

describe('ArriendosComponent', () => {
  let component: ArriendosComponent;
  let fixture: ComponentFixture<ArriendosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArriendosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArriendosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
