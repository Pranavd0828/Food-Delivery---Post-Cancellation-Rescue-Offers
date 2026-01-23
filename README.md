# Rescue Radar (Food Delivery Prototype)

**"Rescue Radar"** is a map-first food delivery experience focused on rescuing last-minute cancelled orders at 50-70% off. It turns food waste prevention into a high-stakes, gamified treasure hunt.

## Core Features
1.  **Rescue Radar (Map)**: Real-time visualization of available rescue deals nearby.
2.  **The Pulse**: Live ticker showing real-time rescues from other users, creating social proof and urgency.
3.  **Deal Details**: A "Secure This Deal" flow with a 90-second hold timer.
4.  **Checkout & Wallet**: Seamless payment flow and "Rescue Credits" tracking.
5.  **Leaderboard ("Waste Warriors")**: Gamified ranking based on CO2 saved and money rescued.
6.  **Visual Polish**: Smooth page transitions and micro-interactions.

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
