import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'chat',
    renderMode: RenderMode.Server,
  },
  {
    path: 'assistente-ia',
    renderMode: RenderMode.Server,
  },
  {
    path: 'produto/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
