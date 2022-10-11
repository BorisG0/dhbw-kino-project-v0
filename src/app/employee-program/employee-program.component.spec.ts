import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeProgramComponent } from './employee-program.component';

describe('EmployeeProgramComponent', () => {
  let component: EmployeeProgramComponent;
  let fixture: ComponentFixture<EmployeeProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeProgramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
