import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function MapContainer() {

    useEffect(() => {
        const latlng = L.latLng(13.7563, 100.5018);
        const map = L.map('map-container').setView(latlng, 10);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
          }).addTo(map);

        const currentMarker = L.marker(latlng).addTo(map);
        currentMarker.bindPopup('You are here!');

          return () => {
            map.remove();
          };
    },[])
  return (
    <div id="map-container" />
  )
}

export default MapContainer