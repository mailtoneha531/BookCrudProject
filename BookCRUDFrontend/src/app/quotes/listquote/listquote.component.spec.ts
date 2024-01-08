import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListquoteComponent } from './listquote.component';

describe('ListquoteComponent', () => {
  let component: ListquoteComponent;
  let fixture: ComponentFixture<ListquoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListquoteComponent]
    });
    fixture = TestBed.createComponent(ListquoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
