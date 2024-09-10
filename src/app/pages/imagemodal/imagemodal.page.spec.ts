import { ComponentFixture, TestBed } from '@angular/core/testing';
import ImagemodalPage from './imagemodal.page';

describe('ImagemodalPage', () => {
  let component: ImagemodalPage;
  let fixture: ComponentFixture<ImagemodalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ImagemodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
