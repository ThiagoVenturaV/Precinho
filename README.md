# 💊 Precinho — Frontend (Pague Menos Care AI)

Frontend oficial do **Precinho (Pague Menos Care AI)** para o Hackathon **Accenture / Avanade REC'n'Play**: Vitrine de e-commerce, Assistente Virtual com IA conversacional, Modo de Voz com Barge-in, Acessibilidade com VLibras e Checkout integrado.

Desenvolvido em **Angular 22** e preparado para deploy contínuo na **Vercel** (`precinho.vercel.app`).

---

## 🌐 Conexão com o Backend

Este frontend está conectado diretamente ao cluster de backend e banco de dados hospedado na **DigitalOcean**:

* **Backend API (DigitalOcean HTTPS):** `https://147.182.163.228.sslip.io`
* **Backend API (DigitalOcean HTTP):** `http://147.182.163.228`
* **Documentação Swagger OpenAPI:** `https://147.182.163.228.sslip.io/swagger-ui/index.html`

O arquivo `vercel.json` já inclui todas as regras de *rewrites* e *proxy reverso* para encaminhar chamadas de `/api/*`, `/ucp/*`, `/acp/*` e `/swagger-ui/*` de forma transparente com streaming SSE e sem problemas de CORS ou Mixed Content.

---

## 🚀 Como Executar Localmente

### 1. Instalar dependências
```bash
npm install
```

### 2. Rodar em modo desenvolvimento
```bash
npm start
```
O servidor de desenvolvimento iniciará em `http://localhost:4200/` usando o `proxy.conf.json` para rotear chamadas de API para o backend na nuvem.

### 3. Compilar para produção
```bash
npm run build
```
Os arquivos estáticos serão gerados em `dist/tela-inicial/browser`.

---

## 📦 Deploy na Vercel

1. Acesse o [Dashboard da Vercel](https://vercel.com/new).
2. Importe o repositório **`Precinho`**.
3. A Vercel detectará automaticamente as configurações através do `vercel.json`:
   * **Framework Preset:** Angular
   * **Build Command:** `npm run build`
   * **Output Directory:** `dist/tela-inicial/browser`
4. Clique em **Deploy**. Sua aplicação estará online em `https://precinho.vercel.app`.
