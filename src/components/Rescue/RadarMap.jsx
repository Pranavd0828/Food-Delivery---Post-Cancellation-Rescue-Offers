import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
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

const RadarMap = () => {
    const { userLocation, offers } = useRescue();

    return (
        <div className="h-full w-full relative">
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

                {/* User Marker */}
                <Marker position={userLocation}>
                    <Popup>You are here</Popup>
                </Marker>

                {/* Restaurant Pins */}
                {offers.map(offer => (
                    <Marker key={offer.id} position={offer.restaurant.location}>
                        <Popup>
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
                                    className="block w-full text-center bg-primary text-white text-sm font-bold py-2 rounded-lg hover:bg-primary/90 transition-colors"
                                >
                                    Rescue This
                                </a>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {/* Overlay UI will go here */}
            <div className="absolute top-4 left-4 z-[999] pointer-events-none">
                <div className="bg-surface/90 backdrop-blur px-4 py-2 rounded-full shadow-lg pointer-events-auto">
                    <span className="font-bold text-primary">Rescue Radar</span>
                    <span className="ml-2 text-sm text-slate-500">Live</span>
                </div>
            </div>
        </div>
    );
};

export default RadarMap;
