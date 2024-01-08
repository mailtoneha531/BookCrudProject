import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditbookComponent } from './addeditbook.component';

describe('AddeditbookComponent', () => {
  let component: AddeditbookComponent;
  let fixture: ComponentFixture<AddeditbookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddeditbookComponent]
    });
    fixture = TestBed.createComponent(AddeditbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
