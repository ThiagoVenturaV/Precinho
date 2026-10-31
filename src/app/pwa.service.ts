import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PwaService {
  private deferredPrompt: any = null;
  readonly canInstall = signal(false);
  readonly isInstalled = signal(false);

  constructor() {
    if (typeof window !== 'undefined') {
      // Check if already running in standalone PWA mode
      if (
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true
      ) {
        this.isInstalled.set(true);
      }

      window.addEventListener('beforeinstallprompt', (e: Event) => {
        // Prevent default browser install banner
        e.preventDefault();
        this.deferredPrompt = e;
        this.canInstall.set(true);
      });

      window.addEventListener('appinstalled', () => {
        this.isInstalled.set(true);
        this.canInstall.set(false);
        this.deferredPrompt = null;
        console.log('[PWA] App instalado com sucesso!');
      });
    }
  }

  async install(): Promise<boolean> {
    if (!this.deferredPrompt) {
      return false;
    }
    try {
      this.deferredPrompt.prompt();
      const choiceResult = await this.deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        this.canInstall.set(false);
        this.deferredPrompt = null;
        return true;
      }
    } catch (err) {
      console.warn('[PWA] Erro durante a instalação:', err);
    }
    return false;
  }
}
