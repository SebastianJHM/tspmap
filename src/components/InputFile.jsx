import React from "react";
import "./InputFile.css";
import * as XLSX from 'xlsx';
import { GlobalContext } from "../context/global/GlobalContext";

function InputFile() {

    const { setCoordinatesData } = React.useContext(GlobalContext);

    const [isInDropZone, setIsInDropZone] = React.useState(false);
    const [fileZoneContent, setFileZoneContent] = React.useState(<span>Seleccione un archivo</span>);

    function inputFile(ev) {
        console.log(ev.target.files)

        const myFile = ev.target.files[0];
        process_file(myFile);
    }

    function dropFile(ev) {
        console.log('Fichero(s) arrastrados');

        // Evitar el comportamiendo por defecto (Evitar que el fichero se abra/ejecute)
        ev.preventDefault();
        console.log(ev.dataTransfer.files);

        if (ev.dataTransfer.files.length == 1) {
            console.log(ev.dataTransfer.files[0].name.split(".").slice(-1)[0]);
            if (ev.dataTransfer.files[0].name.split(".").slice(-1)[0] == "xlsx") {
                const myFile = ev.dataTransfer.files[0];
                process_file(myFile);
            } else {
                setFileZoneContent(
                    <>
                        <span>👀</span>
                        <span>El archivo tiene que ser un .xlsx</span>
                    </>
                );
            }
        } else {
            setFileZoneContent(
                <>
                    <span>👀</span>
                    <span>Arratre un solo archivo</span>
                </>
            );
        }

        removeDragData(ev);

    }

    function dragOverFile(ev) {
        console.log('File(s) in drop zone');
        setIsInDropZone(true);
        // input_drag_drop.style.backgroundColor = "red";
        // input_drag_drop.style.border = "dotted";

        // Prevent default behavior (Prevent file from being opened)
        ev.preventDefault();
    }

    function removeDragData(ev) {
        console.log('Removing drag data');
        setIsInDropZone(false);
        ev.dataTransfer.clearData();
    }


    function process_file(file) {
        setFileZoneContent(
            <>
                <span>Archivo seleccionado: </span>
                <span>{file.name}</span>
            </>
        );
        readFile(file);
    }

    function readFile(file) {
        if (!file) {
            console.log("ingrese archivo");
        } else {
            console.log(file);

            const reader = new FileReader();
            reader.onload = function () {
                // console.log("hols")
                // console.log(evt.target.result)
                const data = reader.result;
                const workbook = XLSX.read(data, { type: 'binary' });
                console.log(workbook)
                const sheet = workbook.Sheets[workbook.SheetNames[0]];


                // header: 0 indica que lea los encabezados
                // header: 1 indica que el archivo no tiene encabezados
                const json_data = XLSX.utils.sheet_to_json(sheet, { header: 0, blankrows: false });
                console.log(json_data);

                setCoordinatesData(json_data);

            }
            reader.readAsArrayBuffer(file);
        }

    }

    return (

        <div id="container-input-file">
            <label
                htmlFor='input-file'
                id="label-input-file"
                onDrop={dropFile}
                onDragOver={dragOverFile}
                style={isInDropZone ? { backgroundColor: "rgb(138, 138, 138)" } : {}}
            >
                <div className="text_input">
                    {fileZoneContent}
                </div>
            </label>
            <input type="file" id="input-file" multiple={false} accept=".xlsx" onChange={inputFile} />
        </div>

    )
}

export { InputFile };