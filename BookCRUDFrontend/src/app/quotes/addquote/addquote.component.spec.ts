import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddquoteComponent } from './addquote.component';

describe('AddquoteComponent', () => {
  let component: AddquoteComponent;
  let fixture: ComponentFixture<AddquoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddquoteComponent]
    });
    fixture = TestBed.createComponent(AddquoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
