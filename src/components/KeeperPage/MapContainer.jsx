import React, { useEffect, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import "leaflet-routing-machine";

function MapContainer(props) {

    const {isMap} = props;
    const cacheMap = useMemo(() => isMap, [isMap])
    const lat = cacheMap[0] || 13.7563;
    const lng = cacheMap[1] || 100.5018

    useEffect(() => {
        
        const customIcon = L.icon({ iconUrl: 'https://i.imgur.com/YRFA9Ve.png', iconSize: [25, 25] });
        const latlng = L.latLng(lat, lng);
        const map = L.map('map-container').setView(latlng, 5);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
          }).addTo(map);

        const currentMarker = L.marker(latlng, {icon: customIcon});
        currentMarker.bindPopup('You are here!');
        
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              const currentLocation = L.latLng(latitude, longitude);
              
              const instance = L.Routing.control({
              waypoints: [
                currentLocation,
                latlng
              ], 
              draggableWaypoints: false,
              addWaypoints: false,
              createMarker: function(i, waypoint, n) {
                // Customize marker appearance
                if (i === 0) { // First waypoint (start location)
                  return L.marker(waypoint.latLng, {
                    icon: L.icon({
                      iconUrl: 'https://i.imgur.com/IDpXrbP.png', // Path to your custom icon
                      iconSize: [25, 25], // Size of the icon
                  })
                  });
                }
                else if (i === n - 1) { // Check if it's the last waypoint (currentLocation)
                    return L.marker(waypoint.latLng, {
                        icon: L.icon({
                            iconUrl: 'https://i.imgur.com/YRFA9Ve.png', // Path to your custom icon
                            iconSize: [25, 25], // Size of the icon
                        })
                    });
                } 
                else {
                    return L.marker(waypoint.latLng); // Default marker for other waypoints
                }
              }       
            })

          instance.addTo(map)
          
          
        },
        (error) => {
          console.error('Error getting current location:', error.message);
          currentMarker.addTo(map);
            }
          );
        }

          return () => {
            map.remove();
          };
    },[])
  return (
    <div id="map-container" />
  )
}

export default MapContainer