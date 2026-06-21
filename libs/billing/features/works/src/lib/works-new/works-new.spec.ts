import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorksNew } from './works-new';

describe('WorksNew', () => {
  let component: WorksNew;
  let fixture: ComponentFixture<WorksNew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorksNew],
    }).compileComponents();

    fixture = TestBed.createComponent(WorksNew);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
