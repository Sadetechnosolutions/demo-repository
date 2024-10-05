// src/components/MapSelector.js
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents ,useMap} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const LocationMarker = ({ userLocation, selectedLocation, onSelectLocation }) => {
  const [address, setAddress] = useState('');
  const map = useMap();

  useEffect(() => {
    if (userLocation) {
      map.setView(userLocation, 13);
    }
  }, [userLocation, map]);

  useMapEvents({
    click(event) {
      const { lat, lng } = event.latlng;
      const location = { lat, lng };
      onSelectLocation(location);
      fetchAddress(location);
    },
  });

  const fetchAddress = async (location) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${location.lat}&lon=${location.lng}&format=json&addressdetails=1`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data && data.address) {
        const { city, town, village, suburb, county, state, country } = data.address;
        const formattedAddress = [city, town, village, suburb, county, state, country].filter(Boolean).join(', ');
        setAddress(formattedAddress || 'Unknown location');
      } else {
        setAddress('Unknown location');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      setAddress('Error retrieving location');
    }
  };

  return (
    <>
      {userLocation && (
        <Marker position={userLocation}>
          <Popup>
            Your current location: {address}
          </Popup>
        </Marker>
      )}
      {selectedLocation && (
        <Marker position={selectedLocation}>
          <Popup>
            Selected location: {address}
          </Popup>
        </Marker>
      )}
    </>
  );
};

const MapSelector = ({ onSelectLocation, onClose }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error fetching user location", error);
        }
      );
    }
  }, []);

  const handleSelectLocation = (location) => {
    console.log('Selected location:', location);
    setSelectedLocation(location);
    onSelectLocation(location);
  };

  return (
    <div>
      <button onClick={onClose} style={{ marginBottom: '10px' }}>x</button>
      <MapContainer
        center={userLocation || [51.505, -0.09]} // Default center if user location is not available
        zoom={13}
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker 
          userLocation={userLocation} 
          selectedLocation={selectedLocation} 
          onSelectLocation={handleSelectLocation} 
        />
      </MapContainer>
    </div>
  );
};

export default MapSelector;
