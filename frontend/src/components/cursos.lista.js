import CursoService from "../services/CursoService"
import {Link} from 'react-router-dom';
import React, { useState, useEffect} from "react";
import ShowHeader from "./cursos.header";
import 'bootstrap/dist/css/bootstrap.css';
import User from "./User";
import { useSelector } from "react-redux";
const ListaCursos = () =>{
    const initialOffset = 0
    const initialDisabled1 = true;
    const initialDisabled2 = true;
    const [cursos, setCursos] = useState([]);
    const [offset, setOffset] = useState(initialOffset);
    const [disabled1, setDisabled1] = useState(initialDisabled1);
    const [disabled2, setDisabled2] = useState(initialDisabled2);
    const [total, setTotal] = useState(initialOffset);
    const { user: currentUser } = useSelector((state) => state.auth);
    const getCount = () => {
        CursoService.getAll('2'+'-'+Number(currentUser.id))
        .then(response => {
            console.log(response.data)
                if(response.data.num==5){
                    setDisabled2(true);
                    setDisabled1(true);
                } else {
                    if(response.data.num<5)
                        setDisabled2(true);
                    else 
                        setDisabled2(false)
                }
                setTotal(response.data.num);
        })
    }
    useEffect(() => {
        setOffset(0);
        getCount();
        getCursos(offset);
        
      }, []);
        
    
    const getCursos = (n) => {
        CursoService.getAll('0'+'-'+n+'-'+Number(currentUser.id))
        .then(response => {
            console.log(response.data)
                setCursos(response.data);
        })
    }
    
    const EliminarCurso = (id, nombre) =>{
        if(window.confirm("¿Desea eliminar el curso "+nombre+"?")==true){
         CursoService.remove(id)
         .then(response => {
             alert("Se ha eliminado exitosamente");
             getCount();
             getCursos(initialOffset);
             setOffset(initialOffset);
             if(total<offset||total==offset) {
                 prevPage();}
         })

        }   
    }
    const nextPage = ()=>{
        const newoffset = offset+5
        setOffset(newoffset);
        getCursos(newoffset);
        setDisabled1(false);
        if(newoffset+5>total) setDisabled2(true);
    }
    const prevPage = () => {
        const newoffset = offset-5
        setOffset(newoffset);
        getCursos(newoffset);
        if(newoffset==0) setDisabled1(true);
        if(disabled2==true) setDisabled2(false);
    }
    return (
        <div>
            <div className="align-items-left ms-3">
                <h3>Eventos formativos registrados:</h3>
            </div>
            <div className="align-items-left ms-3">
            {cursos && cursos.map((cursos, index) => (
                <div className="card mb-3 " key={index}>
                    <div className="card-body">
                        <h3 className="card-title">{cursos.nombre}</h3>
                        <div className="container p-0 w-100 mb-3">
                            <div className="row no-gutters w-100 justify-content-start">
                            <div className="col-sm-3">   
                                    <label><b>Tipo:</b> {cursos.tipo}</label>
                                </div>
                                <div className="col-sm-4">   
                                    <label><b>Encargado:</b> {cursos.encargado}</label>
                                </div>
                                <div className="col-sm-5">   
                                    <label><b>Modalidad: </b>{cursos.modalidad}</label>
                                </div>
                            </div>
                            <div className="row no-gutters w-100 justify-content-start">
                                <div className="col-sm-3">   
                                    <label><b>Duracion: </b> {cursos.duracion}</label>
                                </div>
                                <div className="col-sm-4">   
                                    <label><b>Fecha de inicio: </b>{cursos.fechainicio}</label>
                                </div>
                                <div className="col-sm-5">   
                                    <label><b>Fecha de finalizacion: </b>{cursos.fechafinal}</label>
                                </div>
                            </div>
                            <div className="row no-gutters w-100 justify-content-start">
                                <div className="col-sm-3">   
                                        <label><b>Consejo: </b>{cursos.consejo}</label>
                                </div>
                                <div className="col-sm-4">   
                                    <label><b>Numero de sesion de consejo: </b>{cursos.numsesion}</label>
                                </div>
                                <div className="col-sm-5">   
                                    <label><b>Fecha de reunion: </b>{cursos.fechasesion}</label>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-start gap-3">
                            <Link to={{pathname: `/mod/ModificarCurso/${cursos.id}`}}>
                                <a href="#" className="btn btn-primary mr-3">Editar</a>
                            </Link> 
                            <button className="btn btn-primary" onClick={() => EliminarCurso(cursos.id, cursos.nombre)}>Eliminar</button>
                            <Link to={{pathname: `/mod/GenerarConstancias`}}>
                                <a href="#" className="btn btn-primary ml-3" onClick={() => {console.log(cursos)}}>Generar Constancias</a>
                            </Link> 
                        </div>
                    </div>
                </div>
            ))}
            <div className="container-fluid w-100">
                <div className="row row-cols-3">
                    <div className="column"/>
                        <div className="column d-flex justify-content-center">
                            <nav aria-label="pages">
                                    <ul className="pagination">
                                    <li className="page-item">
                                        <button type="button" disabled={disabled1} onClick={() => prevPage()} className="btn btn-outline-primary mr-2">&lt; </button>
                                    </li>
                                    <li className="page-item">
                                        <button type="button" disabled={disabled2} onClick={() => nextPage()} className="btn btn-outline-primary ms-2">&gt;</button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    <div className="column">
                        <Link to="/mod/AgregarCurso">
                            <button type="button" className="btn btn-primary float-right">Agregar curso</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}
export default ListaCursos;