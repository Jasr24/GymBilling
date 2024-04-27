import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoCuentasComponent } from './estado-cuentas.component';

describe('EstadoCuentasComponent', () => {
  let component: EstadoCuentasComponent;
  let fixture: ComponentFixture<EstadoCuentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadoCuentasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadoCuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
