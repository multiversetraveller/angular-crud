import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogindoneComponent } from './logindone.component';

describe('LogindoneComponent', () => {
  let component: LogindoneComponent;
  let fixture: ComponentFixture<LogindoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogindoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogindoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
