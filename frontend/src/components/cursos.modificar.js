import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useHistory
  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import ShowHeader from "./cursos.header";
import CursoService from "../services/CursoService"
import { useEffect, componentDidMount } from "react";
const ModificarCurso = () => {
    let history = useHistory();
    const initialCursoState = {
        nombre: null,
        encargado: null,
        modalidad: "En linea",
        duracion: null,
        numsesion: null,
        fechasesion: null,
        consejo: null,
        fechainicio: null,
        fechafinal: null,
        tipo: "Curso"
    }
    const [curso, setCurso] = useState(initialCursoState);
    const handleInputChange = event =>{
        const {name, value} = event.target;
        setCurso({...curso, [name]: value});
    };
    let { id } = useParams();
    const getCursos = () => {
        CursoService.getOne(id)
        .then(response => {
            setCurso(response.data);
            console.log(response.data);
            return;
        })
    }
    const updateCurso = () => {
        if(!/^[0-9]+$/.test(curso.duracion)||Number(curso.duracion)>2147483647||Number(curso.duracion)<=0){
            window.alert("La duracion introducida no es valida.");
            return;
        }
        if(!/^[0-9]+-[0-9]+$/.test(curso.numsesion)){
            console.log("ouo"+curso.numsesion)
            window.alert("El numero de sesion introducido no es valido.");
            return;
        }
        for (const key in curso) {
            if(curso[key]==null||String(curso[key].trim)==""){
                window.alert("Los campos no pueden estar vacios.");
                console.log(`${key}: ${curso[key]}`);
                return;
            }
        }
        var data = {
            nombre: curso.nombre,
            encargado: curso.encargado,
            modalidad: curso.modalidad,
            duracion: curso.duracion,
            numsesion: curso.numsesion,
            fechasesion: curso.fechasesion,
            consejo: curso.consejo,
            fechainicio: curso.fechainicio,
            fechafinal: curso.fechafinal,
            tipo: curso.tipo
        };
        console.log(data);
        CursoService.update(id, data)
        .then(response=>{
            window.alert("Se ha guardado exitosamente.");
            history.push("/mod");
        })
        .catch(e=>{
            window.alert("Ocurrio un error");
        });
    };
    useEffect(() => {getCursos()}, []);
    return(
        <div>
           <div className="align-items-left ms-3">
            <h3>Modificar Evento Formativo:</h3>
            </div>
            <div class="row">
                <div class="col ms-3">
                    <label> Nombre </label>
                    <input type="text" class="form-control" id="nombre" required value={curso.nombre} onChange={handleInputChange} name="nombre"/>
                </div>
                <div class="form-group col me-3">
                    <label> Tipo </label>
                    <select class="form-control" id="tipo" required value={curso.tipo} onChange={handleInputChange} name="tipo">
                        <option selected>Curso</option>
                        <option>Taller</option>
                        <option>Programa especial</option>
                        <option>Diplomado</option>
                    </select>
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
                    <select class="form-control" id="modalidad" required value={curso.modalidad} onChange={handleInputChange} name="modalidad">
                        <option selected>En linea</option>
                        <option>Presencial</option>
                        <option>Mixta</option>
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
                    <input type="text" class="form-control" id="numsesion" required value={curso.numsesion} onChange={handleInputChange} name="numsesion"></input>
                </div>
                <div class="form-group col me-3">
                    <label> Fecha de reunion de Consejo </label>
                    <input type="date" class="form-control" id="fechasesion" required value={curso.fechasesion} onChange={handleInputChange} name="fechasesion"/>
                </div>
            </div>
            <div class="col d-flex justify-content-center">
             <button class="btn btn-primary m-3" onClick={updateCurso}>Guardar</button>
            </div>
        </div>
    );
};

export default ModificarCurso;