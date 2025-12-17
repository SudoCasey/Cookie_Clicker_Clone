# Cookie Clicker Clone

A browser-based idle game built with Next.js, inspired by the popular Cookie Clicker game. Click cookies to earn them, then purchase upgrades to generate cookies automatically!

## Features

- **Cookie Clicking**: Click the cookie image to earn cookies
- **Adjustable Click Value**: Customize how many cookies you earn per click
- **Store System**: Purchase various items that generate cookies passively:
  - **Baker** (100 cookies) - 10 CPS
  - **Restaurant** (1,000 cookies) - 100 CPS
  - **Local Baking Club** (10,000 cookies) - 1,000 CPS
  - **Regional Girl Scout Troop** (100,000 cookies) - 10,000 CPS
  - **Child-Labor Factory** (1,000,000 cookies) - 100,000 CPS
  - **National Bakery Holding Co.** (10,000,000 cookies) - 1,000,000 CPS
- **Buy & Sell**: Purchase items to increase your cookies per second (CPS), or sell them back for 50% refund
- **Passive Income**: Items generate cookies automatically over time
- **Time Control**: Pause or resume time progression
- **Save System**: Cookie count is saved to browser cookies (persists across sessions)
- **Number Formatting**: Large numbers are automatically abbreviated (K, M, B, T)

## Tech Stack

- **Next.js** 14.1.0 - React framework
- **React** 18.2.0 - UI library
- **Sass** - CSS preprocessor for styling
- **ESLint** - Code linting

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone [https://github.com/SudoCasey/Cookie_Clicker_Clone.git](https://github.com/SudoCasey/Cookie_Clicker_Clone.git)
cd Cookie_Clicker_Clone
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to play!

## Usage

### Basic Gameplay

1. **Click the Cookie**: Click the cookie image to earn cookies
2. **Adjust Click Value**: Use the "Click Value" input to set how many cookies you earn per click
3. **Buy Items**: Purchase items from the store to generate cookies automatically
4. **Sell Items**: Sell items back to the store for a 50% refund if needed
5. **Monitor Progress**: Watch your CPS (Cookies Per Second) and total cookie count

### Store Items

Each item's cost increases with each purchase (cost = base cost × (items owned + 1)). Items generate cookies passively based on their CPS value.

## Project Structure

```
Cookie_Clicker_Clone/
├── src/
│   ├── pages/
│   │   ├── index.js                    # Main page entry point
│   │   └── cookieClicker/
│   │       ├── cookieClicker.js        # Main game component
│   │       └── components/
│   │           ├── Store.js            # Store component with items
│   │           └── StoreItem.js        # Individual store item component
│   └── styles/
│       ├── globals.scss                # Global styles
│       ├── cookieClicker.module.scss   # Game component styles
│       ├── Store.module.scss           # Store component styles
│       └── StoreItem.module.scss       # Store item styles
├── public/
│   └── cookie.png                      # Cookie image asset
└── package.json                        # Dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Development

The game uses React hooks for state management:
- `useState` for managing cookies, click value, and store items
- `useEffect` for passive cookie generation and cookie persistence
- `useRef` for accumulating fractional cookies

Cookie data is stored in browser cookies with a 1-year expiration. The game automatically loads saved cookie counts on page load.

## License

This project is private and for personal/educational use.
