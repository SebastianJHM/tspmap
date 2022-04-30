import React from "react";
import mapboxgl from 'mapbox-gl';
import { MapContext } from "../context/map/MapContext";
import { GlobalContext } from "../context/global/GlobalContext";

function MapView() {

    const { coordData, coordinatesRoute } = React.useContext(GlobalContext);

    const mapDiv = React.useRef(null);
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2ViYXN0aWFuam9zZSIsImEiOiJjbDJjdDd2azgwc2RuM2pvMjF6YmsxYThoIn0.CS_kAa8atE7dyFWkz1X7Lw';

    const { setMap } = React.useContext(MapContext);

    React.useLayoutEffect(() => {
        const myMap = new mapboxgl.Map({
            container: mapDiv.current, // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [-74.0675838099721, 4.69735139520819], // starting position [lng, lat]
            zoom: 14 // starting zoom
        });

        if (coordData.length > 0) {
            const bounds = new mapboxgl.LngLatBounds(
                [coordData[0].Longitud, coordData[0].Latitud],
                [coordData[0].Longitud, coordData[0].Latitud]
            );


            coordData.forEach(function (place, i) {
                if (i === 0) {
                    const popup = new mapboxgl.Popup().setHTML(`
                        <h6>${place["Lugar"]}</h6>
                        <p>${place["Dirección"]}</p>
                    `);
                    new mapboxgl.Marker({ color: 'red' }).setPopup(popup).setLngLat([place.Longitud, place.Latitud]).addTo(myMap);
                    bounds.extend([place.Longitud, place.Latitud]);
                } else {
                    const popup = new mapboxgl.Popup().setHTML(`
                        <h6>${place["Lugar"]}</h6>
                        <p>${place["Dirección"]}</p>
                    `);
                    new mapboxgl.Marker({ color: 'blue' }).setPopup(popup).setLngLat([place.Longitud, place.Latitud]).addTo(myMap);
                    bounds.extend([place.Longitud, place.Latitud]);
                }
            });

            myMap?.fitBounds(bounds, {
                padding: 50
            });

        }

        if (coordinatesRoute) {

            // if (myMap?.getLayer('RouteString')) {
            //     myMap.removeLayer('RouteString');
            //     myMap.removeSource('RouteString');
            // }

            // Polyline: Ruea que recorre cada calle

            
            const sourceData = {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [
                        {
                            type: 'Feature',
                            properties: {},
                            geometry: {
                                type: 'LineString',
                                coordinates: coordinatesRoute,
                            }
                        }
                    ]
                }
            };

            myMap.on('load', () => {
                myMap?.addSource('RouteString', sourceData);
                myMap?.addLayer({
                    id: 'RouteString',
                    type: 'line',
                    source: 'RouteString',
                    layout: {
                        'line-cap': 'round',
                        'line-join': 'round'
                    },
                    paint: {
                        'line-color': 'black',
                        'line-width': 3
                    }
                })
            });

        }
        setMap(myMap);
    }, [coordData])



    return (
        <div ref={mapDiv}
            style={{
                height: '500px',
                width: '90%',
                minWidth: '500px',
            }}
        >
        </div>
    )
}

export { MapView };