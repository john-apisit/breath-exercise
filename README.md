# 🌬️ Breathe - Breathing Exercise App

A modern, calming web-based breathing exercise app built with Vue 3, Vite, and Tailwind CSS. Inspired by "iBreath – Breathing Exercises" on macOS.

![Breathing App](https://img.shields.io/badge/Vue-3.5-4FC08D?logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)

## ✨ Features

### 🎯 Breathing Presets
- **Box Breathing** (4-4-4-4): Equal breathing for balance and focus
- **4-7-8 Breathing** (4-7-8-0): Calming technique for relaxation
- **Relaxing** (5-0-5-0): Simple and soothing
- **Focus** (4-0-6-0): Longer exhale for concentration

### 🎨 Beautiful UI
- Smooth animated breathing circle
- Calming gradient background
- Clean, minimal design
- Responsive layout (desktop & mobile)
- Accessibility-focused

### ⚙️ Custom Mode
- Customize inhale/hold/exhale durations
- Validation (1-30 seconds per phase)
- Create your own breathing patterns

### ⏱️ Timer & Controls
- Real-time phase countdown
- Total session time tracking
- Start / Pause / Reset controls
- Phase labels (Inhale, Hold, Exhale)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- Yarn (or npm/pnpm)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd breath-exercise

# Install dependencies
yarn install

# Start dev server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview
```

## 🏗️ Architecture

```
src/
├── App.vue                    # Main app container
├── components/
│   ├── BreathingCircle.vue   # Animated breathing circle
│   ├── PresetSelector.vue    # Preset buttons
│   ├── Controls.vue          # Start/Pause/Reset buttons
│   ├── Timer.vue             # Timer display
│   └── CustomSettings.vue    # Custom duration inputs
├── composables/
│   └── useBreathingCycle.ts  # Core breathing logic
├── types/
│   └── breathing.ts          # TypeScript interfaces
└── constants/
    └── presets.ts            # Preset configurations
```

## 🎯 How It Works

### Breathing Cycle Logic
The app uses a composable (`useBreathingCycle`) that manages:
1. **Phase Management**: Cycles through inhale → hold → exhale → hold
2. **Timing**: Updates every 100ms for smooth animations
3. **Animation**: Dynamically calculates circle scale based on current phase
4. **Session Tracking**: Tracks total time spent breathing

### Animation System
- **Inhale**: Circle scales from 1.0 to 2.0 with smooth easing
- **Hold (after inhale)**: Circle stays at 2.0 with subtle pulsing effect
- **Exhale**: Circle scales from 2.0 to 1.0 with smooth easing
- **Hold (after exhale)**: Circle stays at 1.0 with subtle pulsing effect
- Powered by @vueuse/motion for fluid, spring-based animations
- Interactive hover and tap animations on all buttons
- Staggered entrance animations for preset buttons
- Smooth expand/collapse animations for custom settings

## 🎨 Design System

### Colors
- Background: Dark gradient (slate-900 → purple-900)
- Circle: Gradient (blue-400 → purple-400 → pink-400)
- UI Elements: Glass-morphism with backdrop blur

### Typography
- Font: System font stack (-apple-system, SF Pro, Segoe UI)
- Phase text: Large, light weight
- Timer: Monospace for consistency

### Responsive Breakpoints
- Mobile: < 768px (smaller circle, stacked layout)
- Desktop: ≥ 768px (larger circle, spacious layout)

## 🔧 Tech Stack

- **Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Animation**: @vueuse/motion (Motion One for Vue)
- **State Management**: Vue Composition API (no external store)

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## ♿ Accessibility

- Semantic HTML
- ARIA labels on interactive elements
- Keyboard navigation support
- Respects `prefers-reduced-motion`
- High contrast ratios for text

## 🎯 Usage Tips

1. **Starting a Session**: Select a preset or create custom settings, then click Start
2. **Pausing**: Click Pause to temporarily stop the breathing cycle
3. **Resetting**: Click Reset to return to the beginning
4. **Switching Presets**: Select a different preset during or between sessions

## 🔮 Future Enhancements

Potential features to add:
- Sound/audio cues at phase transitions
- Haptic feedback on mobile devices
- Dark/light mode toggle
- LocalStorage persistence
- Fullscreen mode
- Breath counter (cycles completed)
- Multiple color themes
- Export session data

## 📄 License

MIT License - feel free to use this project however you'd like!

## 🙏 Acknowledgments

Inspired by "iBreath – Breathing Exercises" for macOS.

---

Built with ❤️ using Vue 3 + Vite + Tailwind CSS
