import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';

// import "leaflet/dist/leaflet.css"
// import 'leaflet-geosearch/dist/geosearch.css';

  function Map({ idName }) {

    useEffect(() => {
      const latlng = L.latLng(13.7563, 100.5018);
      const map = L.map(idName).setView(latlng, 13);
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);
        // Remove the map when the component is unmounted

        const provider = new OpenStreetMapProvider();
        const searchControl = new GeoSearchControl({
          provider,
          autoComplete: true, // Optional: enable or disable auto-complete suggestions
          style: 'bar',
          showPopup: true,
          keepResult: true,      
          marker: {
            // optional: L.Marker    - default L.Icon.Default
            icon: new L.Icon.Default(),
            draggable: true,
          },
        });
        
        map.addControl(searchControl);

        let currentMarker = null;

            // Get current location and add a marker
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentLocation = L.latLng(latitude, longitude);
          
          if (currentMarker) {
            currentMarker.removeFrom(map); // Remove previous marker
          }

          // Add a marker at the current location
          currentMarker = L.marker(currentLocation, { draggable: true }).addTo(map);
          
          // You can customize the marker icon if needed
          // const customIcon = L.icon({ iconUrl: 'path/to/custom-icon.png', iconSize: [32, 32] });
          // const marker = L.marker(currentLocation, { icon: customIcon }).addTo(map);

          // Optionally, you can open a popup with additional information
          currentMarker.bindPopup('You are here!').openPopup();

          // Pan the map to the current location
          map.panTo(currentLocation);

          currentMarker.on('dragend', (event) => {
            const newLocation = event.target.getLatLng();
            currentMarker.bindPopup(`Latitude ${newLocation?.lat.toFixed(4)}, Longitude ${newLocation.lng.toFixed(4)}`).openPopup();
          });
        },
        (error) => {
          console.error('Error getting current location:', error.message);
        }
      );
    }
    map.on('geosearch/showlocation', () => {
      if (currentMarker) {
        currentMarker.removeFrom(map); // Remove previous marker
      }
    });

    map.on('geosearch/marker/dragend', (event) => {
      const { location } = event; // Assuming the event object contains the marker
      const popupContent = `Latitude: ${location.lat.toFixed(4)}, Longitude: ${location.lng.toFixed(4)}`;
      const popup = L.popup({ offset: L.point(0, -35) }).setLatLng(location) 
      .setContent(popupContent)
      .openOn(map);
      popup.setContent(popupContent)

      // fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.lng}`)
      // .then(response => response.json())
      // .then(data => {
      //     if (data.address) {
      //         let label = data.address.road || data.address.city || data.address.country; // Customize as needed
      //         console.log(data)
      //         // marker.getPopup().setContent("<b>Location:</b> " + label);
      //     } else {
      //         // marker.getPopup().setContent("<b>Location:</b> Coordinates Only"); 
      //     }
      // })
    });

    
        return () => {
          map.remove();
        };
    }, []);
  
    return <div id={idName} />;
  };
  

export default Map;