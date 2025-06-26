# Monster Battle Arena 🐉⚔️

Uma aplicação de batalha de monstros desenvolvida em **React puro** para o desafio técnico da **Revi**. Crie monstros épicos, defina seus atributos e deixe-os lutar pela supremacia!

## 🎯 Funcionalidades

- ✅ **Cadastro de Monstros**: Crie monstros com nome, ataque, defesa, velocidade, HP e imagem
- ✅ **Sistema de Batalha**: Batalhas automáticas entre dois monstros seguindo algoritmo específico
- ✅ **Visualização de Resultados**: Acompanhe cada round da batalha com log detalhado
- ✅ **Interface Intuitiva**: Design responsivo e moderno com tema espacial
- ✅ **Persistência de Dados**: Monstros salvos no localStorage do navegador
- ✅ **Geração Aleatória**: Crie monstros aleatórios com um clique

## 🤖 Algoritmo de Batalha

O sistema de batalha segue as regras especificadas:

1. **Ordem de Ataque**: Monstro com maior velocidade ataca primeiro
   - Em caso de empate na velocidade, quem tem maior ataque vai primeiro
2. **Cálculo de Dano**: `dano = ataque - defesa` (mínimo 1)
3. **Aplicação de Dano**: `hp = hp - dano`
4. **Condição de Vitória**: Primeiro monstro a reduzir o HP do oponente a zero vence
5. **Rounds Alternados**: Monstros atacam alternadamente até haver um vencedor

## 🚀 Tecnologias Utilizadas

- **React 18** com **TypeScript**
- **Vite** como bundler
- **Zustand** para gerenciamento de estado
- **Tailwind CSS** para estilização
- **Radix UI** para componentes base
- **Lucide React** para ícones
- **Sonner** para notificações

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   ├── ui/               # Componentes base (Radix UI)
├── features/             # Funcionalidades organizadas por domínio
│   ├── monster/          # Funcionalidades dos monstros
│   └── battle/           # Funcionalidades de batalha
├── pages/                # Páginas da aplicação
├── models/               # Tipos e interfaces TypeScript
│   └── Monster.ts
├── store/                # Gerenciamento de estado
├── lib/                  # Utilitários
│   └── utils.ts
├── App.tsx               # Componente principal com roteamento
├── main.tsx              # Entry point
└── index.css             # Estilos globais
```

## 🧭 Roteamento

A aplicação utiliza **React Router v6** com as seguintes rotas:

- `/` - Página inicial com estatísticas e introdução
- `/monsters` - Lista e gerenciamento de monstros
- `/create` - Formulário de criação de monstros
- `/battle` - Arena de batalha entre monstros

### Navegação
- Header fixo com logo e link para GitHub
- Barra de navegação responsiva com indicadores visuais
- Badges dinâmicos mostrando quantidade de monstros
- Proteção de rota para batalha (requer 2+ monstros)

## 🛠️ Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm, yarn ou pnpm

### Instalação

1. **Clone o repositório**
```
git clone <url-do-repositorio>
cd monster-battle-arena
```

2. **Instale as dependências**
```
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Execute o projeto**
```
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

4. **Acesse a aplicação**
Abra [http://localhost:5173](http://localhost:5173) no seu navegador

## 🎮 Como Usar

### 1. Criando Monstros
- Vá para a aba "Criar Monstro"
- Preencha o nome e os atributos (ataque, defesa, velocidade, HP)
- Opcionalmente, adicione uma URL de imagem
- Use o botão "Gerar Aleatório" para criar monstros rapidamente

### 2. Visualizando Monstros
- Na aba "Monstros", veja todos os monstros criados
- Cada card mostra os atributos e HP atual
- Use os botões para curar ou excluir monstros

### 3. Batalhas
- Vá para a aba "Arena de Batalha" (disponível com 2+ monstros)
- Selecione dois monstros diferentes
- Clique em "Iniciar Batalha!" e assista ao combate
- Veja o resultado detalhado com log de todos os rounds

## 🎨 Design e UX

- **Tema Espacial**: Gradientes roxo/azul com efeitos de vidro
- **Responsivo**: Funciona perfeitamente em desktop e mobile
- **Feedback Visual**: Animações, cores e ícones intuitivos
- **Acessibilidade**: Componentes semânticos e navegação por teclado

## 🧪 Exemplos de Teste

### Monstros de Exemplo
```
// Monstro Equilibrado
{
  name: "Dragão Flamejante",
  attack: 15,
  defense: 12,
  speed: 10,
  hp: 100
}

// Monstro Rápido
{
  name: "Lobo Sombrio", 
  attack: 12,
  defense: 8,
  speed: 18,
  hp: 80
}

// Monstro Tanque
{
  name: "Golem de Pedra",
  attack: 10,
  defense: 20,
  speed: 5,
  hp: 150
}
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Executa em modo desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa linting do código

## 📝 Considerações Técnicas

### Gerenciamento de Estado
- **Zustand** escolhido pela simplicidade e performance
- Persistência automática no localStorage
- Estado reativo e tipado

### Algoritmo de Batalha
- Implementado em função pura para facilitar testes
- Proteção contra loops infinitos (máx. 100 rounds)
- Log detalhado de cada round para debugging

### Performance
- **Vite** para desenvolvimento rápido e build otimizado
- Componentes otimizados com boas práticas React
- Lazy loading de imagens com fallback
- Animações CSS performáticas

#### Desenvolvido com ❤️ para o desafio técnico da **Revi** 
#### Obrigado pela oportunidade! Espero que gostem da aplicação! 🚀