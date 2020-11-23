import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstabelecimentoProfissionalPesquisarComponent } from './estabelecimento-profissional-pesquisar.component';

describe('EstabelecimentoProfissionalPesquisarComponent', () => {
  let component: EstabelecimentoProfissionalPesquisarComponent;
  let fixture: ComponentFixture<EstabelecimentoProfissionalPesquisarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstabelecimentoProfissionalPesquisarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstabelecimentoProfissionalPesquisarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
