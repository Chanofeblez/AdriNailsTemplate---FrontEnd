import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CancellationpolicyPage } from './cancellationpolicy.page';

describe('CancellationpolicyPage', () => {
  let component: CancellationpolicyPage;
  let fixture: ComponentFixture<CancellationpolicyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CancellationpolicyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
