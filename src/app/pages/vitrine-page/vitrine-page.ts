import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header';
import { Vitrine } from '../../components/vitrine/vitrine';

@Component({
  selector: 'app-vitrine-page',
  standalone: true,
  imports: [HeaderComponent, Vitrine],
  template: `
    <app-header></app-header>
    <app-vitrine></app-vitrine>
  `,
})
export class VitrinePage {}
