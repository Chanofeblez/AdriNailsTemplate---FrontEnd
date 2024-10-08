import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmappointmentmodalPage } from './confirmappointmentmodal.page';

describe('ConfirmappointmentmodalPage', () => {
  let component: ConfirmappointmentmodalPage;
  let fixture: ComponentFixture<ConfirmappointmentmodalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ConfirmappointmentmodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
