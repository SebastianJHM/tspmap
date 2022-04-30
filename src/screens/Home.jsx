import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { CBC } from "./CBC";
import { CPLEX } from "./CPLEX";
import "./Home.css";

function Home() {

    return (
        <>
            <header className="header">
                <nav>
                    <span className="header__tab">
                        <Link to="/cplex">CPLEX</Link>
                    </span>
                    <span className="header__tab">
                        <Link to="/cbc">CBC</Link>
                    </span>
                </nav>
            </header>

            <Routes>
                <Route path="/" element={<Navigate to="/cplex" />} />
                <Route path="/*" element={<Navigate to="/cplex" />} />
                <Route path="/cplex" element={<CPLEX />} />
                <Route path="/cbc" element={<CBC />} />
            </Routes>
        </>
    );
}

export { Home };