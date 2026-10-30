# Modulo De Atendimento Angular

Recurso standalone lazy em `/chat`, sem NgModule. Estado, transporte, ditado e arquivos
sao instanciados por pagina. O design reutiliza o CSS do `chat-html`, prefixado por
`pm-chat-page` para nao alterar o site receptor. Fontes por Google Fonts CDN.

## Pontos De Entrada

- `chat-page`: composicao, formularios, confirmacoes e dialogos.
- `chat-store`: mensagens e snapshot de carrinho. No modo live, nunca calcula preco de kit a partir dos cards nem altera carrinho sem API.
- `chat-transport` / `sse`: POST fetch, parser incremental, abort e timeout.
- `chat-event`: Zod valida dados externos e normaliza `token`, `ui`, `cart_updated` e eventos legados.
- `chat-blocks`: switch fechado para produto, lista, kit, carrinho, rastreio e upload de receita. Nunca recebe um nome de componente Angular arbitrario do servidor.
- `speech-dictation`: API nativa padrao ou prefixada, `pt-BR`, permissao, resultados intermediarios, fim e cancelamento. Nao ha gravacao permanente de audio no app.
- `prescription-files`: assinaturas PDF/imagem, limite de 20MB, consentimento e multipart autenticado. Aprovacao e dada pelo servidor, nunca pelo navegador.
- `api-session`: sessao e CSRF da stack MVP. Sites receptores com JWT devem fornecer seus proprios headers em `CHAT_CONFIG`.

`CHAT_CONFIG` permite endpoint de streaming, upload e carrinho, headers, credenciais,
checkout do site receptor e canal oficial de farmacia. Nao coloque chave Groq no Angular.
O callback de checkout so e chamado apos validacao de estoque/receita no servidor.

## Voz

O usuario confirma o aviso de privacidade antes de iniciar o microfone. Chrome/Safari podem
processar audio remotamente. O app nao promete reconhecimento offline nem suporte universal.
O texto e inserido no campo para revisao; nao envia automaticamente. Sair da pagina,
enviar mensagem ou iniciar outra conversa cancela a sessao de voz.

## Arquivos

PDF, JPG/JPEG, PNG, WebP, GIF, BMP, TIFF, HEIC/HEIF e AVIF; ate 3 por mensagem.
Nao aceitamos qualquer arquivo arbitrario, executaveis, SVG ou documentos com macros.
O upload REST retorna IDs de receita; somente esses IDs entram no turno do chat.
O backend verifica a assinatura novamente, criptografa e aplica a politica de receita.

Os testes unitarios simulam APIs de voz, pois permissao e reconhecimento real dependem
de dispositivo, sistema e navegador. A validacao fisica de Chrome/Safari deve ser feita no
ambiente do usuario; a UI informa indisponibilidade e permite continuar por texto.
