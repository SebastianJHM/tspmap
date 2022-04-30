function MapReducer(state, action) {
    switch (action.type) {
        case 'setMap':
            return {
                ...state,
                isMapReady: true,
                map: action.payload
            }
        default:
            return state;
    }
}


export { MapReducer };