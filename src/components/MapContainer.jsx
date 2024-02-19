import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function MapContainer(props) {

    const {isMap} = props;
    // console.log(isMap[0])
    // console.log(isMap[1])
    const lat = isMap[0] || 13.7563;
    const lng = isMap[1] || 100.5018

    useEffect(() => {
        
        const customIcon = L.icon({ iconUrl: 'https://i.imgur.com/YRFA9Ve.png', iconSize: [32, 32] });
        const latlng = L.latLng(lat, lng);
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