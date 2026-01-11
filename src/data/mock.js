export const USERS = {
    current: {
        id: 'u1',
        name: 'Alex Visitor',
        location: { lat: 37.7749, lng: -122.4194 } // San Francisco
    }
};

export const RESTAURANTS = [
    {
        id: 'r1',
        name: 'Burger & Co.',
        image: 'burgers',
        tags: ['Burgers', 'American', 'Fast Food'],
        lat: 37.7750,
        lng: -122.4183
    },
    {
        id: 'r2',
        name: 'Sushi Zen',
        image: 'sushi',
        tags: ['Sushi', 'Asian', 'Japanese'],
        lat: 37.7739,
        lng: -122.4312
    },
    {
        id: 'r3',
        name: 'Pasta House',
        image: 'pasta',
        tags: ['Pizza', 'Italian', 'Pasta'],
        lat: 37.7849,
        lng: -122.4094
    }
];

// Helper to generate expiry time relative to now
const minutesFromNow = (mins) => new Date(Date.now() + mins * 60000).toISOString();

export const MOCK_OFFERS = [
    {
        id: 'o1',
        restaurantId: 'r1',
        items: [
            { name: 'Double Cheeseburger', quantity: 2, price: 12.99 },
            { name: 'Large Fries', quantity: 1, price: 4.99 },
            { name: 'Vanilla Shake', quantity: 1, price: 5.99 }
        ],
        originalSubtotal: 36.96,
        discountPercent: 25, // Starts at 25
        createdAt: minutesFromNow(-2),
        expiresAt: minutesFromNow(10), // 10 mins remaining
        status: 'AVAILABLE',
        distance: 0.8,
        etaRange: '15-25'
    },
    {
        id: 'o2',
        restaurantId: 'r2',
        items: [
            { name: 'Spicy Tuna Roll', quantity: 2, price: 8.50 },
            { name: 'Miso Soup', quantity: 2, price: 3.00 },
            { name: 'Edamame', quantity: 1, price: 4.50 }
        ],
        originalSubtotal: 27.50,
        discountPercent: 35,
        createdAt: minutesFromNow(-5),
        expiresAt: minutesFromNow(5), // 5 mins remaining
        status: 'AVAILABLE',
        distance: 1.2,
        etaRange: '20-30'
    }
];
