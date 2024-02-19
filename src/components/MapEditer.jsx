import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';

function MapEditer({ editMap }) {

    
    useEffect(() => {
        const customIcon = L.icon({ iconUrl: 'https://i.imgur.com/YRFA9Ve.png', iconSize: [32, 32] });
        const latlng = L.latLng(13.7563, 100.5018);
        const map = L.map('map-editer').setView(latlng, 10);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
          }).addTo(map);

        const currentMarker = L.marker(latlng, { draggable: editMap, icon: customIcon}).addTo(map);
        currentMarker.bindPopup('You are here!');

        const provider = new OpenStreetMapProvider();

        const getLocationData = async (location, updatePopupContent) => {
            const results = await provider.search({ query: `${location.lat}, ${location.lng}` });
            if (results && results.length > 0) {
                let label = results[0].label; // Use the first result as an example
                // currentMarker.getPopup().setContent("<b>Location:</b> " + label);
                updatePopupContent("<b>Location:</b> " + label)
            } else {
                // currentMarker.getPopup().setContent("<b>Location:</b> Coordinates Only");
                updatePopupContent("<b>Location:</b> Coordinates Only")
            }
        };


        const searchControl = new GeoSearchControl({
          provider,
          autoComplete: true, // Optional: enable or disable auto-complete suggestions
          showPopup: true,
          keepResult: true,     
          popupFormat: ({ query, result }) => "This is your current location.", 
          marker: {
            // optional: L.Marker    - default L.Icon.Default
            icon: customIcon,
            draggable: true,
          },
        });
       if(editMap){
           map.addControl(searchControl);
       } 

        currentMarker.on('dragend', (event) => {
            const newLocation = event.target.getLatLng();
            // currentMarker.bindPopup(`Latitude ${newLocation?.lat.toFixed(4)}, Longitude ${newLocation.lng.toFixed(4)}`)
            getLocationData(newLocation, (newContent) => {
                currentMarker.getPopup().setContent(newContent)
            })
          });

        map.on('geosearch/showlocation', () => {
        if (currentMarker) {
            currentMarker.removeFrom(map); // Remove previous marker
        }
        });

        map.on('geosearch/marker/dragend', (event) => {
            const { location  } = event; // Assuming the event object contains the marker
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
    },[editMap])
  return (
    <div id="map-editer" />
  )
}

export default MapEditer