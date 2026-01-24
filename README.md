# Rescue Radar (Food Delivery Prototype)

**"Rescue Radar"** is a map-first food delivery experience focused on rescuing last-minute cancelled orders at 50-70% off. It turns food waste prevention into a high-stakes, gamified treasure hunt.

## Core Features
1.  **Feed-First Discovery**: A vertical, Instagram-style feed for easy browsing of "Rescued" food.
2.  **Live Rescue Alerts**: Real-time simulation of new rescue offers popping up on the map.
3.  **Rescue Radar (Map)**: Interactive map visualization of nearby deals.
4.  **The Pulse**: Live ticker showing real-time rescues vs waste saved.
5.  **Deal Details**: A "Secure This Deal" flow with a 90-second hold timer.
6.  **Gamified Checkout**: Leaderboard ranking ("Waste Warriors") based on CO2 saved.

## Tech Stack
*   **Framework**: React + Vite
*   **Styling**: Tailwind CSS
*   **Maps**: React Leaflet
*   **Icons**: Lucide React
*   **Animations**: Framer Motion

## Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Run Development Server**
    ```bash
    npm run dev
    ```

3.  **Build for Production**
    ```bash
    npm run build
    ```

## Project Structure
*   `src/components/Rescue`: Core feature components (RadarMap, PulseTicker, HoldTimer).
*   `src/pages`: Main views (Home, Leaderboard, Wallet, Checkout).
*   `src/contexts`: Global state (RescueContext for offers/cart).
