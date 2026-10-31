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

---

## 🔐 Autenticação com Argon2 & Checkout Resiliente por Etapa (MVP)

A plataforma conta com gestão de usuários, senhas protegidas com padrão criptográfico moderno e fluxo de checkout desacoplado por etapa, evitando a perda de progresso por instabilidade de rede ou recarregamento de página.

### 👤 Usuário Padrão para Testes e Avaliação da Banca
O sistema já inicializa automaticamente um usuário normal para demonstração imediata:
* **E-mail:** `cliente@paguemenos.com.br`
* **Senha:** `Precinho@2026`
* **Nome:** `Cliente Pague Menos`
* **Telefone:** `(11) 98765-4321` | **CPF:** `123.456.789-00`
* **Endereço Vinculado:** `Rua Pamplona, 680, Jardins, São Paulo - SP` (CEP: `01415-000`)

> **Como testar:** No chat do Precinho, abra o **Perfil de Cuidado** no menu lateral ou clique no botão **"Preencher Usuário Teste"** para autenticar com 1 clique.

### 🛡️ Criptografia de Senha com Argon2
* As senhas de usuários são protegidas usando **Argon2id** via Spring Security Crypto (`Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8()`) e BouncyCastle.
* Parâmetros de segurança: Salt de 16 bytes, Hash de 32 bytes, 16 MiB de custo de memória, 2 iterações e paralelismo otimizado.

### 🛒 Checkout Desacoplado com Persistência Imediata por Tela
Em vez de enviar um único payload monolítico ao final da compra, cada etapa do checkout é uma requisição independente que salva o estado imediatamente no banco de dados (`checkout_sessions` e `usuario`):
1. **Etapa 1 — Entrega & Endereço (`PUT /api/checkout/sessions/{id}/delivery`):**
   * Persiste o CEP, rua, número, bairro, cidade, estado e modalidade de entrega (Retirada grátis ou Entrega expressa).
   * **Persistência no Cliente:** O CEP e endereço informados são vinculados automaticamente ao perfil do cliente logado. Ao reabrir o checkout ou recarregar a página, todos os dados de entrega já vêm preenchidos sem necessidade de nova digitação.
2. **Etapa 2 — Ofertas Complementares (Upsell):**
   * Apresenta ofertas exclusivas de cuidados; itens adicionados via botão "Levar" são integrados imediatamente ao carrinho.
3. **Etapa 3 — Pagamento (`PUT /api/checkout/sessions/{id}/payment`):**
   * Persiste o método de pagamento selecionado (Pix, Cartão de Crédito, Carteira Digital ou Pagar na retirada).
4. **Etapa 4 — Revisão & Confirmação (`POST /api/checkout/sessions/{id}/complete`):**
   * Finaliza a sessão de compra gerando o pedido definitivo com número de protocolo e rastreio.
