import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import "leaflet-routing-machine";

function MapContainer(props) {

    const {isMap} = props;
    const lat = isMap[0] || 13.7563;
    const lng = isMap[1] || 100.5018

    useEffect(() => {
        
        const customIcon = L.icon({ iconUrl: 'https://i.imgur.com/YRFA9Ve.png', iconSize: [25, 25] });
        const latlng = L.latLng(lat, lng);
        const map = L.map('map-container').setView(latlng, 5);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
          }).addTo(map);

        const currentMarker = L.marker(latlng, {icon: customIcon});
        currentMarker.bindPopup('You are here!');

        // let marker = null;
        
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              const currentLocation = L.latLng(latitude, longitude);
              
              // Add a marker at the current location
              
              // marker = L.marker(currentLocation, { draggable: true, icon: customIcon }).addTo(map);
              
              const instance = L.Routing.control({
              waypoints: [
                latlng,
                currentLocation
              ], 
              draggableWaypoints: false,
              addWaypoints: false,
              createMarker: function(i, waypoint, n) {
                // Customize marker appearance
                if (i === 0) { // First waypoint (start location)
                  return L.marker(waypoint.latLng, {
                    icon: L.icon({
                      iconUrl: 'https://i.imgur.com/YRFA9Ve.png', // Path to your custom icon
                      iconSize: [25, 25], // Size of the icon
                  })
                  });
                }
                else if (i === n - 1) { // Check if it's the last waypoint (currentLocation)
                    return L.marker(waypoint.latLng, {
                        icon: L.icon({
                            iconUrl: 'https://i.imgur.com/IDpXrbP.png', // Path to your custom icon
                            iconSize: [25, 25], // Size of the icon
                        })
                    });
                } 
                else {
                    return L.marker(waypoint.latLng); // Default marker for other waypoints
                }
              }       
            })

          //   console.log(instance)

          //   instance.on('routesfound', function(e) {
          //     const routes = e.routes;
          //     const summary = routes[0].summary;
          //     // Get total distance of the route in meters
          //     const distance = summary.totalDistance;
          
          //     // Optionally, convert the distance to kilometers and log it
          //     const distanceInKm = (distance / 1000).toFixed(2);
          //     console.log(`Distance: ${distance} meters (${distance} km)`);
          // });

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