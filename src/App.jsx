import React from 'react';
import { GlobalProvider } from './context/global/GlobalProvider';
import { MapProvider } from './context/map/MapProvider';
import { Home } from './screens/Home';
import { BrowserRouter } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <GlobalProvider>
                <MapProvider>
                    <Home />
                </MapProvider>
            </GlobalProvider>
        </BrowserRouter>

    );
}

export default App
