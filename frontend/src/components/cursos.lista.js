import CursoService from "../services/CursoService"
import {Link} from 'react-router-dom';
import React, { useState, useEffect} from "react";
import ShowHeader from "./cursos.header";


const ListaCursos = () =>{
    const initialOffset = 0
    const initialDisabled1 = true;
    const initialDisabled2 = true;
    const [cursos, setCursos] = useState([]);
    const [offset, setOffset] = useState(initialOffset);
    const [disabled1, setDisabled1] = useState(initialDisabled1);
    const [disabled2, setDisabled2] = useState(initialDisabled2);
    const [total, setTotal] = useState(initialOffset);
    const getCount = () => {
        CursoService.getCount()
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
        getCursos(offset);
        getCount();
      }, []);
        
    
    const getCursos = (n) => {
        CursoService.getAll(n)
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
            <ShowHeader/>
            <br/><br/>
            <div className="align-items-left ms-3">
                <h3>Cursos disponibles:</h3>
            </div>
            <div className="align-items-left ms-3">
            {cursos && cursos.map((cursos, index) => (
                <div className="card m-3 " key={index}>
                    <div className="card-body">
                        <h5 className="card-title">{cursos.nombre}</h5>
                        <div className="d-flex justify-content-start gap-3">
                            <Link to={{pathname: `/mod/ModificarCurso/${cursos.id}`}}>
                                <a href="#" className="btn btn-primary ">Editar</a>
                            </Link> 
                            <button className="btn btn-primary" onClick={() => EliminarCurso(cursos.id, cursos.nombre)}>Eliminar</button>
                            <a href="#" className="btn btn-primary ">Generar Constancias</a>
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
                    <div className="column ">
                        <Link to="/mod/AgregarCurso">
                            <button type="button" className="btn btn-primary float-end">Agregar curso</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}
export default ListaCursos;