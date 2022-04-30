function GlobalReducer(state, action) {
    switch (action.type) {
        case 'setCoordData':
            return {
                ...state,
                coordData: action.payload,
            }
        case 'setDistanceMatrix':
            return {
                ...state,
                distanceMatrix: action.payload,
            }
        case 'setTimeMatrix':
            return {
                ...state,
                timeMatrix: action.payload,
            }
        case 'setPlaces':
            return {
                ...state,
                places: action.payload,
            }
        case 'setSolvingModel':
            return {
                ...state,
                solvingModel: action.payload,
            }
        case 'setSolutionCplex':
            return {
                ...state,
                solutionCplex: action.payload,
            }
        case 'setSolutionCBC':
            return {
                ...state,
                solutionCBC: action.payload,
            }
        case 'setCoordinatesRoute':
            return {
                ...state,
                coordinatesRoute: action.payload,
            }
        default:
            return state;
    }
}


export { GlobalReducer };