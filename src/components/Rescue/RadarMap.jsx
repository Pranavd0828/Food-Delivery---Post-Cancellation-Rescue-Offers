import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { useRescue } from '../../contexts/RescueContext';
import L from 'leaflet';
import { Clock, MapPin } from 'lucide-react';

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

import AlertOverlay from './AlertOverlay';
import { AnimatePresence } from 'framer-motion';

const RadarMap = () => {
    const { userLocation, offers } = useRescue();
    const [liveAlerts, setLiveAlerts] = useState([]);

    // Simulation Engine: Trigger random alerts
    useEffect(() => {
        const interval = setInterval(() => {
            const randomOffer = offers[Math.floor(Math.random() * offers.length)];
            const shouldTrigger = Math.random() > 0.6; // 40% chance to trigger an alert

            if (shouldTrigger && randomOffer) {
                const newAlert = {
                    id: Date.now(),
                    restaurantName: randomOffer.restaurant.name,
                    item: randomOffer.items[0].name,
                    discount: randomOffer.discountPercent,
                    location: randomOffer.restaurant.location
                };

                setLiveAlerts(prev => [newAlert, ...prev].slice(0, 3)); // Keep last 3

                // Auto dismiss after 5 seconds
                setTimeout(() => {
                    setLiveAlerts(prev => prev.filter(a => a.id !== newAlert.id));
                }, 5000);
            }
        }, 2000); // Check every 2 seconds

        return () => clearInterval(interval);
    }, [offers]);

    return (
        <div className="h-full w-full relative">
            <AlertOverlay alerts={liveAlerts} />

            <MapContainer
                center={userLocation}
                zoom={14}
                scrollWheelZoom={true}
                className="h-full w-full"
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; OpenStreetMap'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />

                {/* Hot Zones (Heatmap Simulation) */}
                <Circle
                    center={[37.7765, -122.4172]}
                    radius={800}
                    pathOptions={{ color: 'transparent', fillColor: '#FF7675', fillOpacity: 0.2 }}
                />
                <Circle
                    center={[37.7735, -122.4210]}
                    radius={600}
                    pathOptions={{ color: 'transparent', fillColor: '#6C5CE7', fillOpacity: 0.15 }}
                />

                {/* User Marker */}
                <Marker position={userLocation}>
                    <Popup>You are here</Popup>
                </Marker>

                {/* Restaurant Pins */}
                {offers.map(offer => (
                    <Marker key={offer.id} position={offer.restaurant.location}>
                        <Popup autoPanPadding={[20, 150]}>
                            <div className="p-1 min-w-[150px]">
                                <strong className="block text-primary text-base mb-1">{offer.restaurant.name}</strong>
                                <div className="text-sm text-slate-700 mb-2">{offer.items[0].name}</div>

                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-1 text-xs text-red-500 font-bold bg-red-50 px-2 py-0.5 rounded">
                                        <Clock size={12} />
                                        <span>Last Call</span>
                                    </div>
                                    <span className="font-bold text-slate-900">-${offer.discountPercent}%</span>
                                </div>

                                <a
                                    href={`/rescue/${offer.id}`}
                                    className="block w-full text-center bg-primary !text-white text-sm font-bold py-2 rounded-lg hover:bg-primary/90 transition-colors"
                                >
                                    Rescue This
                                </a>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {/* Live Alert Pulsating Markers */}
                {liveAlerts.map(alert => (
                    <Circle
                        key={alert.id}
                        center={alert.location}
                        radius={100}
                        pathOptions={{ color: '#EF4444', fillColor: '#EF4444', fillOpacity: 0.4 }}
                    />
                ))}

            </MapContainer>

            {/* Overlay UI will go here */}
            <div className="absolute top-4 left-4 z-[999] pointer-events-none">
                <div className="bg-surface/90 backdrop-blur px-4 py-2 rounded-full shadow-lg pointer-events-auto flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="font-bold text-primary">Rescue Radar</span>
                    <span className="text-sm text-slate-500 font-mono">LIVE</span>
                </div>
            </div>
        </div>
    );
};

export default RadarMap;
