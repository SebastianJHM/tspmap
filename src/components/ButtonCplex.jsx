import React from "react";
import { GlobalContext } from "../context/global/GlobalContext";
import { MapContext } from "../context/map/MapContext";

function ButtonCplex() {
    const { distanceMatrix, timeMatrix, coordData, setSolvingModel, setSolutionCplex, setCoordinatesRoute } = React.useContext(GlobalContext);
    const { map } = React.useContext(MapContext);

    async function modelCplex() {

        setSolvingModel(true);

        
        try {
            const ti = performance.now();

            const response = await fetch("https://optfastapi.herokuapp.com/cplex", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Places: [...Array(timeMatrix.length).keys()],
                    Matrix: timeMatrix,
                }),
                mode: 'cors',
            });
            const data_json = await response.json();

            

            const tf = performance.now();

            console.log(data_json);
            console.log("tiempo de ejecución: ", (tf - ti) / 1000)

            setSolutionCplex(data_json);
            graphRoute(data_json);

            
        } catch (e) {
            console.log(e);
            alert("Error en la ejecución del modelo");
        }

        setSolvingModel(false);


        
    }

    async function graphRoute(result) {
        // `https://api.mapbox.com/directions/v5/mapbox/driving/${xi[0]}%2C${xi[1]}%3B${xf[0]}%2C${xf[1]}%3B${xf2[0]}%2C${xf2[1]}?alternatives=false&geometries=geojson&overview=simplified&steps=false&access_token=pk.eyJ1Ijoic2ViYXN0aWFuam9zZSIsImEiOiJjbDJjdDd2azgwc2RuM2pvMjF6YmsxYThoIn0.CS_kAa8atE7dyFWkz1X7Lw`;
        const url_route = result.route.map((r) => (`${coordData[r].Longitud}%2C${coordData[r].Latitud}`)).join("%3B");
        console.log(url_route);
        const resp = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${url_route}?alternatives=false&geometries=geojson&overview=simplified&steps=false&access_token=pk.eyJ1Ijoic2ViYXN0aWFuam9zZSIsImEiOiJjbDJjdDd2azgwc2RuM2pvMjF6YmsxYThoIn0.CS_kAa8atE7dyFWkz1X7Lw`);
        const resp_json = await resp.json();
        console.log(resp_json);
        const { distance, duration, geometry } = resp_json.routes[0];
        const { coordinates } = geometry;
        setCoordinatesRoute(coordinates);

        const kms = Math.round((distance / 1000) * 100) / 100;
        const minutes = Math.floor(duration / 60);
        console.log({ kms, minutes });

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
                            coordinates: coordinates,
                        }
                    }
                ]
            }
        };

        if (map?.getLayer('RouteString')) {
            map.removeLayer('RouteString');
            map.removeSource('RouteString');
        }

        map?.addSource('RouteString', sourceData);
        map?.addLayer({
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
        });



    }


    return (
        <button onClick={modelCplex} disabled={timeMatrix.length === 0 ? true : false}>Ejecutar Modelo</button>
    )
}

export { ButtonCplex };