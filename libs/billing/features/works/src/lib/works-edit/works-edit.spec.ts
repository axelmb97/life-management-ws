import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorksEditn } from './works-edit';

describe('WorksEditn', () => {
  let component: WorksEditn;
  let fixture: ComponentFixture<WorksEditn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorksEditn],
    }).compileComponents();

    fixture = TestBed.createComponent(WorksEditn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
