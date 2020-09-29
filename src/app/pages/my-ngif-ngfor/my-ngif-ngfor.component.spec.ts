import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyNgifNgforComponent } from './my-ngif-ngfor.component';

describe('MyNgifNgforComponent', () => {
  let component: MyNgifNgforComponent;
  let fixture: ComponentFixture<MyNgifNgforComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyNgifNgforComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyNgifNgforComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
