import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';

  function Map({ idName, getLocation, getLocationLabel }) {

    useEffect(() => {
      const latlng = L.latLng(13.7563, 100.5018);
      const map = L.map(idName).setView(latlng, 13);
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);
        // Remove the map when the component is unmounted

        const customIcon = L.icon({ iconUrl: 'https://i.imgur.com/YRFA9Ve.png', iconSize: [32, 32] });
        
        const getLocationData = async (location, updatePopupContent) => {
          const results = await provider.search({ query: `${location.lat}, ${location.lng}` });
          if (results && results.length > 0) {
            let label = results[0].label;
            getLocationLabel(label)
            // currentMarker.getPopup().setContent("<b>Location:</b> " + label);
            updatePopupContent("<b>Location:</b> " + label)
          } else {
            // currentMarker.getPopup().setContent("<b>Location:</b> Coordinates Only");
            updatePopupContent("<b>Location:</b> Coordinates Only")
          }
        };
        const provider = new OpenStreetMapProvider();
        const searchControl = new GeoSearchControl({
          provider,
          autoComplete: true, // Optional: enable or disable auto-complete suggestions
          style: 'bar',
          showPopup: true,
          keepResult: true,    
          popupFormat: ({ query, result }) => "This is your current location.",   
          marker: {
            // optional: L.Marker    - default L.Icon.Default
            icon: customIcon,
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
          
          currentMarker = L.marker(currentLocation, { draggable: true, icon: customIcon }).addTo(map);
          
          // You can customize the marker icon if needed
          
          // const marker = L.marker(currentLocation, { icon: customIcon }).addTo(map);

          // Optionally, you can open a popup with additional information
          getLocation(`${currentLocation.lat}, ${currentLocation.lng}`)
          currentMarker.bindPopup('You are here!').openPopup();

          // Pan the map to the current location
          map.panTo(currentLocation);

          currentMarker.on('dragend', (event) => {
            const newLocation = event.target.getLatLng();
            getLocation(`${newLocation.lat}, ${newLocation.lng}`)
            getLocationData(newLocation, (newContent) => {
              currentMarker.bindPopup(newContent).openPopup()
          })});
        },
        (error) => {
          console.error('Error getting current location:', error.message);
        }
      );
    }
    map.on('geosearch/showlocation', (event) => {
      const { location } = event
      console.log(location)
      getLocation(`${location.y}, ${location.x}`)
      getLocationLabel(location.label)
      // console.log("lat "+location.lat, "lon " + location.lng)
      if (currentMarker) {
        currentMarker.removeFrom(map); // Remove previous marker
      }
    });

    map.on('geosearch/marker/dragend', (event) => {
      const { location } = event; // Assuming the event object contains the marker
      getLocation(`${location.lat}, ${location.lng}`)
      const popupContent = "This is your current location.";
      const popup = L.popup({ offset: L.point(0, -35) }).setLatLng(location) 
      .setContent(popupContent)
      // .openOn(map);
      // popup.setContent(popupContent)
      getLocationData(location, (newContent) => {
        popup.setContent(newContent).update();
    })

    });

    
        return () => {
          map.remove();
        };
    }, []);
  
    return <div id={idName} />;
  };
  

export default Map;