import React from "react";
import { ButtonCplex } from "../components/ButtonCplex";
import { ButtonMatrix } from "../components/ButtonMatrix";
import { InputFile } from "../components/InputFile";
import { MapView } from "../components/MapView";
import { SolvingModel } from "../components/SolvingModel";
import { GlobalContext } from "../context/global/GlobalContext";
import "./CPLEX.css";

function CPLEX() {
    const { solvingModel, places, solutionCplex } = React.useContext(GlobalContext);

    return(
        <div className="container1">

            <div className="container2">
                <h1>Travelling Salesman Problem </h1>
            </div>

            <div className="container3">
                <h2 className="file_title">•••••• Ingrese archivo coordenadas ••••••</h2>
                <InputFile />
            </div>

            <div className="container4">
                <ButtonMatrix />
                <ButtonCplex />
            </div>


            {solutionCplex && 
                <div className="container5">
                    <h2>Solución del modelo</h2>
                    <div className="container51">
                        <span className="fo">Tiempo total recorrido: {solutionCplex.total_distance} minutos</span>
                        <div>
                            {solutionCplex.route.map((r,i) =>(
                                <span  key={i}>
                                    <span className="places">{r}</span>
                                    {i < solutionCplex.route.length - 1 && 
                                        <span className="arrow">&raquo;</span>
                                    }
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            }

            <div className="container6">
                <MapView />
            </div>

            

            {solvingModel === true &&
                <SolvingModel />
            }
        </div>
    )
}

export { CPLEX };