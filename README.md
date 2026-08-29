# Univibração — Web App 3D

Painel de controle audiovisual inspirado na referência enviada, com DNA 3D real, progressão de 7 módulos e reprodução de áudio local sincronizada por percentual do arquivo.

## Requisitos

- Node.js 20.19+ ou 22.12+
- npm

## Instalação

```bash
npm install
```

## Executar

```bash
npm run dev
```

Abra a URL mostrada pelo Vite.

## Build de produção

```bash
npm run build
```

## Como usar

1. Clique em **POWER**.
2. Clique em **+ ADICIONAR ÁUDIO** e escolha MP3, WAV, OGG, OPUS, M4A ou AAC.
3. Ajuste o volume e a barra de progresso do player.
4. Clique em **PLAY**.
5. A luz avança automaticamente conforme os limites percentuais configurados em cada módulo.
6. Clique em um módulo para testar sua iluminação manualmente.
7. Use as barras dos módulos para alterar o percentual final de cada trecho. O início do módulo seguinte é reajustado automaticamente.
8. No painel do DNA, **AUTO ON/OFF** liga/desliga a rotação automática e o slider altera a velocidade.
9. Arraste o DNA para girar a câmera e use roda/pinça para zoom. O botão ↺ restaura a câmera.

## Estrutura

```text
src/
├── components/
│   ├── AudioPlayer.jsx
│   ├── ControlPanel.jsx
│   ├── DNA.jsx
│   ├── Icons.jsx
│   ├── ModuleList.jsx
│   ├── ModulePreview.jsx
│   └── SystemStatus.jsx
├── data/
│   └── modules.js
├── hooks/
│   └── useExperience.js
├── App.jsx
├── App.css
└── main.jsx
```

O áudio não é enviado para servidor: o navegador usa `URL.createObjectURL()` para reproduzir o arquivo selecionado localmente.
