import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoSelectorPage } from './photo-selector.page';

describe('PhotoSelectorPage', () => {
  let component: PhotoSelectorPage;
  let fixture: ComponentFixture<PhotoSelectorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoSelectorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
