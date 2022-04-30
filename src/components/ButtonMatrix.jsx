import React from "react";
import { GlobalContext } from "../context/global/GlobalContext";

function ButtonMatrix() {
    const { coordData, setDistanceMatrix, setTimeMatrix, setPlaces } = React.useContext(GlobalContext);

    async function getDistanceDuration(pi, pf) {
        const [lat1, lng1] = pi;
        const [lat2, lng2] = pf;
        const resp = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${lng1}%2C${lat1}%3B${lng2}%2C${lat2}?alternatives=false&geometries=geojson&overview=simplified&steps=false&access_token=pk.eyJ1Ijoic2ViYXN0aWFuam9zZSIsImEiOiJjbDJjdDd2azgwc2RuM2pvMjF6YmsxYThoIn0.CS_kAa8atE7dyFWkz1X7Lw`);
        const resp_json = await resp.json();

        // console.log(resp_json)
        const distance_km = resp_json.routes[0].distance / 1000;
        const duration_min = resp_json.routes[0].duration / 60;
        // console.log({ distance_km, duration_min })

        return ({ distance_km, duration_min });
    }

    async function getParams() {
        console.log(coordData)

        // Asignar lugares
        const places = coordData.map((c) => (c.Lugar));
        setPlaces(places);

        const LatLng = coordData.map((c) => ([c.Latitud, c.Longitud]));
        console.log(LatLng);

        const DISTANCES = [];
        const TIEMPOS = [];
        for (const i in LatLng) {
            const row_d = [];
            const row_t = [];
            for (const j in LatLng) {
                const { distance_km, duration_min } = await getDistanceDuration(LatLng[i], LatLng[j]);
                row_d.push(distance_km);
                row_t.push(duration_min);
            }
            DISTANCES.push(row_d);
            TIEMPOS.push(row_t);
        }
        setDistanceMatrix(DISTANCES);
        setTimeMatrix(TIEMPOS);

        console.log(DISTANCES);
        console.log(TIEMPOS);

    }

    return (
        <button onClick={getParams}>Procesar Datos</button>
    )
}

export { ButtonMatrix };