# Monster Battle Arena 🐉⚔️

A monster battle application built in **Vanilla React** for the **Revi** technical challenge. Create epic monsters, set their attributes, and let them fight for supremacy!

## 🎯 Features

- ✅ **Monster Creation**: Create monsters with name, attack, defense, speed, HP, and image
- ✅ **Battle System**: Automatic battles between two monsters following a specific algorithm
- ✅ **Battle Log**: View each round of the battle with detailed logs
- ✅ **Intuitive Interface**: Responsive and modern design with a space-themed UI
- ✅ **Data Persistence**: Monsters are saved in the browser’s localStorage
- ✅ **Random Generation**: Instantly create random monsters with one click

## 🤖 Battle Algorithm

The battle system follows these rules:

1. **Attack Order**: The monster with the highest speed attacks first  
   - If speeds are tied, the one with the highest attack goes first  
2. **Damage Calculation**: `damage = attack - defense` (minimum of 1)  
3. **Damage Application**: `hp = hp - damage`  
4. **Victory Condition**: First monster to reduce opponent’s HP to zero wins  
5. **Alternating Rounds**: Monsters take turns attacking until a winner is declared  

## 🚀 Technologies Used

- **React 18** with **TypeScript**
- **Vite** as the bundler
- **Zustand** for state management
- **Tailwind CSS** for styling
- **Tailwind CSS Animate** for animations
- **Radix UI** for base UI components
- **Lucide React** for icons
- **Sonner** for toast notifications
- **i18next** for internationalization

## 📁 Project Structure

```
src/
├── components/           # Reusable components
│   ├── ui/               # Base UI components (Radix UI)
├── features/             # Feature-based organization
│   ├── monster/          # Monster-related logic
│   └── battle/           # Battle logic
├── pages/                # Application pages
├── models/               # TypeScript types and interfaces
│   └── Monster.ts
├── store/                # Global state management (Zustand)
├── lib/                  # Utility functions
│   └── utils.ts
├── App.tsx               # Main component with routing
├── main.tsx              # App entry point
└── index.css             # Global styles
```

## 🧭 Routing

The app uses **React Router v6** with the following routes:

- `/` - Home page with stats and introduction
- `/monsters` - Monster list and management
- `/create` - Monster creation form
- `/battle` - Battle arena for monster duels

### Navigation

- Fixed header with logo and GitHub link
- Responsive nav bar with visual indicators
- Dynamic badges showing monster count
- Route guard for battle arena (requires 2+ monsters)

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn or pnpm

### Installation

1. **Clone the repository**
```bash
git clone <repo-url>
cd monster-battle-arena
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Start the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Access the app**
Open [http://localhost:5173](http://localhost:5173) in your browser

## 🎮 How to Use

### 1. Creating Monsters
- Go to the "Create Monster" tab
- Fill in the name and attributes (attack, defense, speed, HP)
- Optionally add an image URL
- Use the "Generate Random" button for quick monster creation

### 2. Viewing Monsters
- Go to the "Monsters" tab to see all created monsters
- Each card shows current attributes and HP
- Use buttons to heal or delete monsters

### 3. Battles
- Go to the "Battle Arena" tab (only if 2+ monsters exist)
- Select two different monsters
- Click "Start Battle!" to watch them fight
- Detailed log shows all battle rounds and the final winner

## 🎨 Design and UX

- **Space Theme**: Blue/purple gradients with glass effects
- **Responsive**: Fully works on desktop and mobile
- **Visual Feedback**: Animations, intuitive icons, and color cues
- **Accessibility**: Semantic components and keyboard-friendly navigation

## 🧪 Test Examples

### Example Monsters

```ts
// Balanced Monster
{
  name: "Flame Dragon",
  attack: 15,
  defense: 12,
  speed: 10,
  hp: 100
}

// Fast Monster
{
  name: "Shadow Wolf", 
  attack: 12,
  defense: 8,
  speed: 18,
  hp: 80
}

// Tank Monster
{
  name: "Stone Golem",
  attack: 10,
  defense: 20,
  speed: 5,
  hp: 150
}
```

## 🔧 Available Scripts

- `npm run dev` - Run in development mode
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint the codebase

## 📝 Technical Notes

### State Management
- **Zustand** was chosen for its simplicity and performance
- Automatic localStorage persistence
- Fully typed and reactive state

### Battle Algorithm
- Implemented as a pure function for testability
- Loop capped at 100 rounds to avoid infinite loops
- Full round log available for debugging and transparency

### Performance
- **Vite** for fast development and optimized build
- Component structure follows React best practices
- Lazy image loading with fallback
- Lightweight CSS animations for performance

---

#### Built with ❤️ for the **Revi** technical challenge  
#### Thanks for the opportunity! Hope you enjoy the app! 🚀