import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Pague Menos | Farmácia Delivery e Saúde',
    loadComponent: () =>
      import('./pages/vitrine-page/vitrine-page').then((m) => m.VitrinePage),
  },
  {
    path: 'chat',
    title: 'Precinho & Kits | Pague Menos',
    loadComponent: () => import('./chat/chat-page').then((m) => m.ChatPage),
  },
  {
    path: 'produto/:id',
    title: 'Produto | Pague Menos',
    loadComponent: () =>
      import('./pages/produto-page/produto-page').then((m) => m.ProdutoPage),
  },
  {
    path: 'precinho',
    redirectTo: 'chat',
    pathMatch: 'full',
  },
  {
    path: 'assistente-ia',
    redirectTo: 'chat',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
