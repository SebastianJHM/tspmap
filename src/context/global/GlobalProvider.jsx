import React from "react";
import { GlobalContext } from "./GlobalContext";
import { GlobalReducer } from "./GlobalReducer";


function GlobalProvider(props) {
    const INITIAL_STATE = {
        coordData: {},
        distanceMatrix: [],
        timeMatrix: [],
        places: [],
        solvingModel: false,
        solutionCplex: null,
        solutionCBC: null,
        coordinatesRoute: null,
    };

    const [state, setState] = React.useReducer(GlobalReducer, INITIAL_STATE);

    function setCoordinatesData(data_) {
        setState({type: "setCoordData", payload: data_});
    }

    function setDistanceMatrix(matrix_) {
        setState({type: "setDistanceMatrix", payload: matrix_});
    }

    function setTimeMatrix(matrix_) {
        setState({type: "setTimeMatrix", payload: matrix_});
    }

    function setPlaces(places_) {
        setState({type: "setPlaces", payload: places_});
    }

    function setSolvingModel(s) {
        setState({type: "setSolvingModel", payload: s});
    }

    function setSolutionCplex(s) {
        setState({type: "setSolutionCplex", payload: s});
    }

    function setSolutionCBC(s) {
        setState({type: "setSolutionCBC", payload: s});
    }

    function setCoordinatesRoute(s) {
        setState({type: "setCoordinatesRoute", payload: s});
    }




    return(
        <GlobalContext.Provider value={{
            ...state,
            setCoordinatesData,
            setDistanceMatrix,
            setTimeMatrix,
            setPlaces,
            setSolvingModel,
            setSolutionCplex,
            setSolutionCBC,
            setCoordinatesRoute,
        }}>
            {props.children}
        </GlobalContext.Provider>
    )
}

export { GlobalProvider };