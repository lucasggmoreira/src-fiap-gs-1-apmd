# AlertaSlide - Sistema de Monitoramento de Deslizamentos

## 🏚️ Grupo

Eduardo Alves Carmo da Silva - RM 98016
Lucas Gabriel Gianini Moreira - RM 99921

## 📱 Sobre o Projeto

O **AlertaSlide** é um aplicativo mobile desenvolvido em React Native que simula uma rede de sensores inteligentes para monitoramento de riscos de deslizamentos. Inspirado em iniciativas como o Alerta Rio e os Early Warning Systems, o aplicativo permite monitorar indicadores ambientais e prever riscos de deslizamentos em tempo real.

## 🎯 Objetivos

- Monitorar indicadores como umidade do solo e inclinação
- Prever riscos de deslizamentos através de análise de dados
- Emitir alertas para áreas vulneráveis
- Fornecer histórico de monitoramento
- Sugerir ações de mitigação

## 🛠️ Tecnologias Utilizadas

- **React Native** com TypeScript
- **Expo** para desenvolvimento e build
- **React Navigation** para navegação entre telas
- **AsyncStorage** para armazenamento local
- **Expo Linear Gradient** para elementos visuais

## 📱 Funcionalidades

### 🏠 Tela de Boas-vindas
- Apresentação do aplicativo
- Navegação inicial para inserção de dados

### 📊 Inserção de Dados Ambientais
- Formulário para inserção de:
  - Localização
  - Umidade do solo (0-100%)
  - Inclinação (-90 a 90 graus)
- Validação de dados
- Cálculo automático de risco

### ⚠️ Visualização de Riscos
- Exibição de alertas recentes
- Status atual por localização
- Classificação de risco por cores:
  - 🟢 Baixo (verde)
  - 🟡 Moderado (amarelo)
  - 🟠 Alto (laranja)
  - 🔴 Crítico (vermelho)

### 📈 Histórico de Monitoramento
- Visualização cronológica dos dados
- Histórico organizado por data
- Estatísticas gerais
- Opção para limpar histórico

### 🛠️ Ações de Mitigação
- Lista de ações preventivas organizadas por prioridade
- Contatos de emergência
- Sinais de alerta para observar
- Botão de emergência para ligações

## 🔧 Instalação e Execução

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn
- Expo CLI (`npm install -g expo-cli`)

### Passos para execução

1. Clone o repositório:
```bash
git clone [url-do-repositorio]
cd src-fiap-gs-1-apmd-entrega
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto:
```bash
npm start
```

4. Use o Expo Go no seu dispositivo móvel para testar o aplicativo escaneando o QR Code, ou execute em um emulador.

## 📊 Algoritmo de Análise de Risco

O aplicativo utiliza um algoritmo simples para calcular o risco de deslizamento:

### Pontuação por Umidade do Solo:
- \> 80%: +3 pontos
- 60-80%: +2 pontos
- 40-60%: +1 ponto
- < 40%: 0 pontos

### Pontuação por Inclinação:
- \> 30°: +3 pontos
- 20-30°: +2 pontos
- 10-20°: +1 ponto
- < 10°: 0 pontos

### Classificação Final:
- **Crítico** (5+ pontos): Risco muito alto
- **Alto** (3-4 pontos): Risco alto
- **Moderado** (2 pontos): Risco moderado
- **Baixo** (0-1 pontos): Condições normais

## 🗂️ Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   └── BottomNavigation.tsx
├── routes/             # Configuração de navegação
│   └── AppNavigator.tsx
├── screens/            # Telas do aplicativo
│   ├── WelcomeScreen.tsx
│   ├── DataInputScreen.tsx
│   ├── RiskViewScreen.tsx
│   ├── HistoryScreen.tsx
│   └── MitigationScreen.tsx
├── services/           # Lógica de negócio
│   ├── storage.ts
│   └── riskAnalyzer.ts
├── styles/             # Estilos globais
│   └── global.ts
└── types/              # Definições de tipos
    └── index.ts
```

## 💾 Armazenamento de Dados

O aplicativo utiliza o AsyncStorage para persistir dados localmente:

- **Dados de Sensores**: Armazenados com timestamp, localização e medições
- **Alertas**: Histórico de alertas gerados automaticamente
- **Configurações**: Preferências do usuário (futuro)

## 🚨 Funcionalidades de Emergência

- Botão de emergência na tela de mitigação
- Contatos diretos para:
  - Bombeiros (193)
  - Defesa Civil (199)
  - SAMU (192)
  - Polícia Militar (190)

## 🎨 Design e UX

- Interface moderna e intuitiva
- Cores que representam níveis de risco
- Navegação fluida entre telas
- Feedback visual para ações do usuário
- Compatibilidade com dispositivos móveis

## 📝 Considerações Acadêmicas

Este projeto foi desenvolvido como trabalho acadêmico para a disciplina de Advanced Programming And Mobile Dev, focando em:

- Simplicidade e funcionalidade
- Uso de boas práticas de desenvolvimento
- Implementação de conceitos de programação móvel
- Solução de alto impacto social

## 🔮 Melhorias Futuras

- Integração com APIs de clima reais
- Notificações push para alertas
- Mapas interativos com localização
- Sincronização com servidor remoto
- Múltiplos usuários e permissões
- Relatórios e análises avançadas

## 📞 Contatos de Emergência

Em caso de emergência real, acione imediatamente:
- **Bombeiros**: 193
- **Defesa Civil**: 199
- **SAMU**: 192

---

**Desenvolvido para fins acadêmicos - FIAP**
