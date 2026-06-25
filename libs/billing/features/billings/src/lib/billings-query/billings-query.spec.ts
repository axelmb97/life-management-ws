import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BillingsQuery } from './billings-query';

describe('BillingsQuery', () => {
  let component: BillingsQuery;
  let fixture: ComponentFixture<BillingsQuery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillingsQuery],
    }).compileComponents();

    fixture = TestBed.createComponent(BillingsQuery);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
