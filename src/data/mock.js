export const CURRENT_USER = {
    id: 'u1',
    name: 'Alex',
    location: [37.7749, -122.4194],
    walletBalance: 14.50,
    credits: 5.00
};

export const RESTAURANTS = [
    { id: 'r1', name: 'Sushi Zen', type: 'Sushi', location: [37.7765, -122.4172], rating: 4.8 },
    { id: 'r2', name: 'Burger & Co', type: 'Burgers', location: [37.7735, -122.4210], rating: 4.5 },
    { id: 'r3', name: 'Baja Fresh', type: 'Mexican', location: [37.7780, -122.4150], rating: 4.2 },
    { id: 'r4', name: 'Pasta House', type: 'Italian', location: [37.7710, -122.4190], rating: 4.6 },
    { id: 'r5', name: 'Green Salad', type: 'Healthy', location: [37.7755, -122.4240], rating: 4.7 },
    { id: 'r6', name: 'Taco Tremendo', type: 'Mexican', location: [37.7765, -122.4175], rating: 4.3 },
    { id: 'r7', name: 'Dim Sum Daily', type: 'Chinese', location: [37.7725, -122.4150], rating: 4.4 },
    { id: 'r8', name: 'Pizza My Heart', type: 'Pizza', location: [37.7780, -122.4220], rating: 4.8 }
];

export const MOCK_OFFERS = [
    {
        id: 'o1',
        restaurantId: 'r1',
        items: [{ name: 'Spicy Tuna Roll', quantity: 2 }, { name: 'Miso Soup', quantity: 1 }],
        originalPrice: 24.50,
        discountPrice: 12.25,
        discountPercent: 50,
        expiresAt: new Date(Date.now() + 1000 * 60 * 15).toISOString(),
        status: 'AVAILABLE'
    },
    {
        id: 'o2',
        restaurantId: 'r2',
        items: [{ name: 'Double Cheeseburger', quantity: 1 }, { name: 'Fries', quantity: 1 }],
        originalPrice: 18.00,
        discountPrice: 8.00,
        discountPercent: 55,
        expiresAt: new Date(Date.now() + 1000 * 60 * 8).toISOString(),
        status: 'AVAILABLE'
    },
    {
        id: 'o3',
        restaurantId: 'r5',
        items: [{ name: 'Kale Caesar', quantity: 1 }],
        originalPrice: 14.00,
        discountPrice: 5.00,
        discountPercent: 65,
        expiresAt: new Date(Date.now() + 1000 * 60 * 4).toISOString(),
        status: 'AVAILABLE'
    },
    {
        id: 'o4',
        restaurantId: 'r6',
        items: [{ name: '3x Birria Tacos', quantity: 1 }, { name: 'Consome', quantity: 1 }],
        originalPrice: 15.00,
        discountPrice: 7.50,
        discountPercent: 50,
        expiresAt: new Date(Date.now() + 1000 * 60 * 20).toISOString(),
        status: 'AVAILABLE'
    },
    {
        id: 'o5',
        restaurantId: 'r7',
        items: [{ name: 'Pork Buns (3pcs)', quantity: 1 }, { name: 'Shumai', quantity: 1 }],
        originalPrice: 12.00,
        discountPrice: 7.20,
        discountPercent: 40,
        expiresAt: new Date(Date.now() + 1000 * 60 * 12).toISOString(),
        status: 'AVAILABLE'
    },
    {
        id: 'o6',
        restaurantId: 'r8',
        items: [{ name: 'Large Pepperoni', quantity: 1 }],
        originalPrice: 28.00,
        discountPrice: 8.40,
        discountPercent: 70,
        expiresAt: new Date(Date.now() + 1000 * 60 * 5).toISOString(),
        status: 'AVAILABLE'
    }
];

export const getOffersWithRestaurant = () => {
    return MOCK_OFFERS.map(offer => {
        const restaurant = RESTAURANTS.find(r => r.id === offer.restaurantId);
        return { ...offer, restaurant };
    });
};
