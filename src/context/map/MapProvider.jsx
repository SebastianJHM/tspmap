import React from "react";
import { MapContext } from "./MapContext";
import { MapReducer } from "./MapReducer";
import { GlobalContext } from "../global/GlobalContext";


function MapProvider(props) {
    const INITIAL_STATE = {
        isMapReady: false,
        map: undefined,
    }

    const [state, setState] = React.useReducer(MapReducer, INITIAL_STATE);
    const { coordData } = React.useContext(GlobalContext);


    // React.useEffect(function () {
    //     if (state.isMapReady) {

    //         const bounds = new mapboxgl.LngLatBounds(
    //             [coordData[0].Longitud, coordData[0].Latitud],
    //             [coordData[0].Longitud, coordData[0].Latitud]
    //         );


    //         coordData.forEach(function (place, i) {
    //             if ( i === 0) {
    //                 const popup = new mapboxgl.Popup().setHTML(`
    //                     <h6>${place["Lugar"]}</h6>
    //                     <p>${place["Dirección"]}</p>
    //                 `);
    //                 new mapboxgl.Marker({ color: 'red' }).setPopup(popup).setLngLat([place.Longitud, place.Latitud]).addTo(state.map);
    //                 bounds.extend([place.Longitud, place.Latitud]);
    //             } else {
    //                 const popup = new mapboxgl.Popup().setHTML(`
    //                     <h6>${place["Lugar"]}</h6>
    //                     <p>${place["Dirección"]}</p>
    //                 `);
    //                 new mapboxgl.Marker({ color: 'blue' }).setPopup(popup).setLngLat([place.Longitud, place.Latitud]).addTo(state.map);
    //                 bounds.extend([place.Longitud, place.Latitud]);
    //             }
    //         });

    //         state.map?.fitBounds( bounds, {
    //             padding: 50
    //         });

    //     }
    // }, [coordData])

    function setMap(map) {

        // const myLocationPopup = new mapboxgl.Popup().setHTML(`
        //     <p>Aquí estoy</p>
        //     <p>En algún lugar del mundo</p>
        // `);

        // new mapboxgl.Marker({ color: 'red' }).setLngLat(map.getCenter()).setPopup(myLocationPopup).addTo(map);

        setState({ type: 'setMap', payload: map })
    }

    return (
        <MapContext.Provider value={{
            ...state,
            setMap,
        }}>
            {props.children}
        </MapContext.Provider>
    )
}

export { MapProvider };