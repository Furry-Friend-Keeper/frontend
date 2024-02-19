import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function MapContainer(props) {

    const {isMap} = props;

    useEffect(() => {
      // You can customize the marker icon if needed
        const customIcon = L.icon({ iconUrl: 'https://i.imgur.com/YRFA9Ve.png', iconSize: [32, 32] });
        const latlng = L.latLng(isMap[0], isMap[1]);

        const map = L.map('map-container').setView(latlng, 10);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
          }).addTo(map);

        const currentMarker = L.marker(latlng, {icon: customIcon}).addTo(map);
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