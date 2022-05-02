import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import ShowHeader from "./cursos.header";
import CursoService from "../services/CursoService"
import {useHistory} from "react-router-dom";
const AddCurso = () => {
    let history = useHistory();
    const initialCursoState = {
        id: null,
        nombre: null,
        encargado: null,
        modalidad: "En linea",
        duracion: null,
        numsesion: null,
        fechasesion: null,
        consejo: null,
        fechainicio: null,
        fechafinal: null
    }
    const [curso, setCurso] = useState(initialCursoState);
    const handleInputChange = event =>{
        const {name, value} = event.target;
        setCurso({...curso, [name]: value});
    };
    const saveCurso = () => {

        var data = {
            nombre: curso.nombre,
            encargado: curso.encargado,
            modalidad: curso.modalidad,
            duracion: curso.duracion,
            numsesion: curso.numsesion,
            fechasesion: curso.fechasesion,
            consejo: curso.consejo,
            fechainicio: curso.fechainicio,
            fechafinal: curso.fechafinal
        };
        CursoService.create(data)
        .then(response =>{
            setCurso({
                nombre: response.data.nombre,
                encargado: response.data.encargado,
                modalidad: response.data.modalidad,
                duracion: response.data.duracion,
                numsesion: response.data.numsesion,
                fechasesion: response.data.fechasesion,
                consejo: response.data.consejo,
                fechainicio: response.data.fechainicio,
                fechafinal: response.data.fechafinal
            });
            window.alert("Se ha guardado exitosamente.");
            history.push("/");
        })
        .catch(e=>{
            console.log(e);
        });
    };
    return(
        <div>
            <ShowHeader/>
            <br/><br/>
            <div className="align-items-left ms-3">
            <h3>Agregar Curso:</h3>
            </div>
            <div class="row">
                <div class="col ms-3">
                    <label> Nombre </label>
                    <input type="text" class="form-control" id="nombre" required value={curso.nombre} onChange={handleInputChange} name="nombre"/>
                </div>
                <div class="form-group col me-3">
                    <label> Fecha de reunion de Consejo </label>
                    <input type="date" class="form-control" id="fechasesion" required value={curso.fechasesion} onChange={handleInputChange} name="fechasesion"/>
                </div>
            </div>
            <div class="row">
                <div class="col mt-3 ms-3">
                    <label> Encargado </label>
                    <input type="text" class="form-control" id="encargado" required value={curso.encargado} onChange={handleInputChange} name="encargado"></input>
                </div>
                <div class="form-group col mt-3 me-3">
                    <label> Consejo Universitario Correspondiente </label>
                    <input type="text" class="form-control" id="consejo" required value={curso.consejo} onChange={handleInputChange} name="consejo"></input>
                </div>
            </div>
            <div class="row">
                <div class="col mt-3 ms-3">
                    <label> Modalidad </label>
                    <select class="form-select" id="modalidad" required value={curso.modalidad} onChange={handleInputChange} name="modalidad">
                        <option selected>En linea</option>
                        <option>Presencial</option>
                    </select>
                </div>
                <div class="form-group col mt-3 me-3">
                    <label> Fecha de Inicio </label>
                    <input type="date" class="form-control" id="fechainicio" required value={curso.fechainicio} onChange={handleInputChange} name="fechainicio"></input>
                </div>
            </div>
            <div class="row">
                <div class="col mt-3 ms-3">
                    <label> Duracion en Horas </label>
                    <input type="number" class="form-control" id="duracion" required value={curso.duracion} onChange={handleInputChange} name="duracion"></input>
                </div>
                <div class="form-group col mt-3 me-3">
                    <label> Fecha de Finalizacion </label>
                    <input type="date" class="form-control" id="fechafinal" required value={curso.fechafinal} onChange={handleInputChange} name="fechafinal"></input>
                </div>
            </div>
            <div class="row">
                <div class="col mt-3 ms-3">
                    <label> Numero de sesion de consejo</label>
                    <input type="number" class="form-control" id="numsesion" required value={curso.numsesion} onChange={handleInputChange} name="numsesion"></input>
                </div>
                <div class="form-group col mt-3 me-3"/>
            </div>
            <div class="col d-flex justify-content-center">
             <button class="btn btn-primary m-3" onClick={saveCurso}>Guardar</button>
            </div>
        </div>
    );
};

export default AddCurso;