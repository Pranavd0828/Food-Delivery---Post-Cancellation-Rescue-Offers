# Product Strategy: Rescue Radar

## What I am doing
I am building "Rescue Radar," a real-time marketplace for last-minute food cancellations. This is not a standard delivery app; rather, it is a specialized rapid-response platform designed to turn food waste into deeply discounted opportunities.

It solves a specific inefficiency: the "last mile" of cancelled orders. When a customer cancels or fails to pick up an order, that food usually goes to the trash. My solution broadcasts these opportunities instantly to nearby users, allowing them to rescue the meal for a fraction of the cost while ensuring the restaurant recovers its sunk costs.

## How I am executing this
I have implemented a hyper-local, gamified interface to drive immediate action. The core experience is map-first, visualizing deals in the user's immediate vicinity to encourage walking or short drives.

**Pricing & Economics**
I am executing a pricing model based on **Sunk Cost Recovery** and **Dynamic Decay**:
*   **The Cost of Zero**: To a restaurant, a cancelled order is worth $0 (total loss).
*   **The Rescue Sweet Spot**: We target **50 percent to 70 percent off**. At 30 percent, the restaurant covers raw ingredients. At 50 percent, they recover costs plus a margin. At 70 percent, the goal is purely waste reduction and brand exposure.
*   **Dynamic Decay**: Prices capture urgency. An item might start at 50 percent off, but if unclaimed after 15 minutes, it drops to 60 percent. This creates a natural "dutch auction" mechanic that clears inventory fast.

**Mechanics**
*   **Realtime Urgency**: Offers are ephemeral, living for only ~30 minutes.
*   **The Hold Mechanism**: A 90-second "lock" prevents double-booking and gamifies the claim process.
*   **Social Proof**: A live "Pulse" ticker shows real-time rescues, building trust and community momentum.

## Engineering Implementation
My technical execution focuses on speed and "app-like" fluidity within a web environment, essential for a time-sensitive marketplace.
*   **Core Architecture**: Built on **React 19** and **Vite** for sub-second load times. The application uses a "Feed-First" architecture that prioritizes visual content while keeping the map heavily optimized in the background.
*   **Simulation Engine**: I developed a custom polling engine (`RadarMap.jsx`) that mathematically simulates a busy marketplace. It uses probability weights to trigger "live" rescue events, creating immediate engagement for the user without needing a massive initial user base.
*   **State Management**: Using specialized **Context APIs** (`RescueContext`), I manage the high-velocity flow of real-time offer data and countdown timers globally, preventing race conditions (e.g., two users claiming the same item).
*   **Geospatial Layer**: The map is powered by **React-Leaflet** with custom tile layers. I solved the common "cluttered map" problem by implementing dynamic popup positioning (`autoPanPadding`) effectively creating a collision-aware UI that keeps alerts visible.


## Why I am doing this
Food waste is a massive, solvable problem. Restaurants lose revenue on every uncollected order, and the environmental cost of wasted food is staggering. Current delivery apps treat cancellations as errors to be hidden; I treat them as assets to be highlighted. By turning this loss into a win-win—cheap premium food for users, cost recovery for restaurants—I create a sustainable ecosystem that feels good ethically and financially.

## Why now should I be doing this
Three macroeconomic factors make this the perfect moment for Rescue Radar:
1.  **Economic Pressure**: Inflation has made traditional food delivery expensive. Consumers are actively seeking deals and are willing to compromise on specific cravings for significant savings.
2.  **Gig Economy Density**: In dense urban centers, the density of users and restaurants is finally high enough to make a 15-minute "rescue window" viable.
3.  **Sustainability Awareness**: Modern consumers prefer brands that align with their eco-friendly values. "Rescuing" food has become a status signal, not just a frugal choice.
