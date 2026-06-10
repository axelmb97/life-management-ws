import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorksQuery } from './works-query';

describe('WorksQuery', () => {
  let component: WorksQuery;
  let fixture: ComponentFixture<WorksQuery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorksQuery],
    }).compileComponents();

    fixture = TestBed.createComponent(WorksQuery);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
