import 'bootstrap/dist/css/bootstrap.css';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect} from "react";
import { data } from 'jquery';
import { useParams } from "react-router-dom";
import StudentService from '../services/StudentService';
import { jsPDF } from "jspdf";
import CursoService from "../services/CursoService"

var students_2 = [];

const GenerarConstancias = () => {
    
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(0)
    const initialCursoState = {
        id: null,
        nombre: "test",
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
    let { id } = useParams();

    function student(name, father_last, mother_last, id_curso) {
        const stu = new Object();

        stu.name = name;
        stu.father_last = father_last;
        stu.mother_last = mother_last;
        stu.id_curso = id_curso;
        
        return stu;
    }
    function getCurso(){
        CursoService.get1(id)
        .then(response => {
            setCurso(response.data);
            console.log(response.data);
            return;
        })
    }
    useEffect(() => {
        getCurso();
      }, []);
    function generatePDFS(students, startIndex, endIndex) {
       
        console.log("a"+id);
        const doc = new jsPDF({orientation: "landscape"});
        
        let name = "Ing. de Software";
        let duration = "80 horas";
        let fecha = "7 de marzo de 2022, Hermosillo, Sonora.";

        doc.text(students[startIndex].name + students[startIndex].father_last + students[startIndex].mother_last, 100, 60);
        doc.text(name, 100, 80);
        doc.text(duration, 100, 100);
        doc.text(fecha, 100, 120);

        console.log(students);
        
        for(let i = startIndex + 1; i <= endIndex; i++) {
            doc.addPage();            
            doc.text(students[i].name + students[i].father_last + students[i].mother_last, 100, 60);
            doc.text(name, 100, 80);
            doc.text(duration, 100, 100);
            doc.text(fecha, 100, 120);
        }

        doc.save("constancias.pdf");
    }

    function sendStudent(stu) {
        StudentService.create(stu).then(console.log('Yeaaaah')).
            catch(e=>{
                console.log(e);
                });

    }

    const [globalStudents, addStudents] = useState([]);
    const [show, setShow] = useState(false);

    
    const handleClose = () => {
        setShow(false);
        console.log(globalStudents);
        console.log(students_2);
    }

    function handleShow() {
        setShow(true);
    }

    const saveStudents = () => {
        setShow(true);

        let reader;

        if (document.getElementById('fileUpload').files !== null && 
            document.getElementById('fileUpload').files[0] !== null) {

            reader = new FileReader();
        
            reader.readAsText(document.getElementById('fileUpload').files[0]);

            reader.addEventListener('load', fileLoaded);
        } 

        handleClose();
    }

    const fileLoaded = (e) => {
            let reader = e.target;

            if (reader.readyState === 2 /* DONE */ ) {
                console.log(reader.result);

                let data = reader.result;
                
                let i = data.indexOf('nombre, apellido_paterno, apellido_materno\n');
                if(i !== -1) data = data.replace('nombre, apellido_paterno, apellido_materno\n', '');

                let students = [];
                let n = 0;

                i = data.indexOf(',');

                while (i !== -1) {
                    let name = data.slice(0, i);
                    data = data.replace(name + ", ", "");

                    i = data.indexOf(',');
                    let fathers_last = data.slice(0,i);
                    data = data.replace(fathers_last + ", ", "");

                    i = data.indexOf('\n');
                    let mothers_last = data.slice(0,i);
                    data = data.replace(mothers_last + "\n", "");

                    students[n] = student(name, fathers_last, mothers_last, id);
                    n++;

                    console.log(name + " " + fathers_last + " " + mothers_last);
                    i = data.indexOf(',');
                }

                generatePDFS(students, start, end);

            } else {
                console.log("reader not ready.");
            }
    }


    return (
        <div className = "w-100 h-100" id="student_page">
            <div className="align-items-left ms-3">
                <h3>Generar Constancias de Acreditación</h3>
                <h4>Insertar rango de alumnos</h4>
                <div class="row">
                <div class="col mt-3 ms-3">
                    <label> Inicio </label>
                    <input type="number" onChange={event => setStart(event.target.value)} class="form-control" id="inicio" name="inicio"></input>
                </div>
                <div class="form-group col mt-3 me-3">
                    <label> Final </label>
                    <input type="number" class="form-control"  onChange={event => setEnd(event.target.value)} id="final" name="final"></input>
                </div>
            </div>
            </div>
            <br></br>
            <br></br>
            <br></br>


            <Modal show={show} onHide={handleClose} size="lg" animation={false}>
                <Modal.Header closeButton>
                <Modal.Title>Agregar alumnos acreditados</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Deberás agregar una lista de los alumnos que acreditaron el curso.</h5>
                    <h5>Indica el consejo divisional que aprobó esta lista, así como la fecha y el número de sesión.</h5>
                    <br></br>
                    <br></br>
                    <div className="row">
                        <div className="col ms-3">
                            <label> Consejo que aprobó la lista de acreditados </label>
                            <input type="text" className="form-control" id="consejo"/>
                        </div>
                        <div className="form-group col me-3">
                            <label> Fecha de reunion de Consejo </label>
                            <input type="date" className="form-control" id="fechasesion"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col mt-3 ms-3">
                            <label> Numero de sesión de consejo</label>
                            <input type="number" className="form-control" id="numsesion" ></input>
                        </div>
                        <div classname="d-flex flex-column justify-content-end form-group col mt-3 me-3">
                            Archivo .csv de alumnos:
                            <br></br>
                            <input type="file" id="fileUpload" name="file" accept=".csv"></input>
                        </div>
                    </div>
                    <div className="row">
                        <div classname="d-flex flex-column justify-content-end form-group col mt-3 me-3">
                            Archivo .png de firma correspondiente: 
                            <br></br>
                            <input type="file" id="imgUpload" name="imgFile" accept=".png"></input>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex justify-content-end mt-3 ms-3">
                        <Button variant="primary" onClick={saveStudents}>
                            Agregar alumnos 
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>

            <footer class = "footer">
                <div class="container">
                    <div class="row no-gutters">
                        <div class="col-sm justify-content-start">
                            <Button variant="primary" onClick={handleShow}>
                                Subir CSV de alumnos
                            </Button>
                        </div>
                        <div class="col-sm float-right">
                            <button className="btn btn-primary ml-3 float-right" onClick={handleShow}> Generar constancias</button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
);
}

export default GenerarConstancias;
