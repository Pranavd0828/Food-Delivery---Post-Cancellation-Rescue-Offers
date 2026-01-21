import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { divIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './TrackingMap.css';

// Fix Leaflet clean marker issues in React
const createCustomIcon = (type) => divIcon({
    className: `custom-marker ${type}`,
    html: `<div class="marker-pin ${type}"></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30]
});

const RecenterMap = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        map.flyTo(center, map.getZoom());
    }, [center, map]);
    return null;
};

export default function TrackingMap({ step }) {
    // Mock route: Restaurant -> Home
    const restaurantPos = [37.7750, -122.4183]; // Burger & Co
    const homePos = [37.7749, -122.4194]; // User Home (very close for testing)

    // Interpolate driver position based on step (0-4)
    const getDriverPos = (currentStep) => {
        if (currentStep === 0) return restaurantPos;
        if (currentStep >= 4) return homePos;

        // Simple linear interpolation
        const progress = currentStep / 4;
        return [
            restaurantPos[0] + (homePos[0] - restaurantPos[0]) * progress,
            restaurantPos[1] + (homePos[1] - restaurantPos[1]) * progress
        ];
    };

    const driverPos = getDriverPos(step);

    return (
        <div className="map-container-wrapper">
            <MapContainer
                center={driverPos}
                zoom={16}
                scrollWheelZoom={false}
                className="leaflet-map"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />

                <Marker position={restaurantPos} icon={createCustomIcon('restaurant')}>
                    <Popup>Burger & Co.</Popup>
                </Marker>

                <Marker position={homePos} icon={createCustomIcon('home')}>
                    <Popup>You</Popup>
                </Marker>

                {step < 5 && (
                    <Marker position={driverPos} icon={createCustomIcon('driver')}>
                        <Popup>Your Driver</Popup>
                    </Marker>
                )}

                <RecenterMap center={driverPos} />
            </MapContainer>
        </div>
    );
}
