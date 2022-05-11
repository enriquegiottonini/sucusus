import 'bootstrap/dist/css/bootstrap.css';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect} from "react";
import { data } from 'jquery';
import { useParams } from "react-router-dom";
//import StudentService from '../services/StudentService';
import { jsPDF } from "jspdf";
import CursoService from "../services/CursoService"
import constancia from "./Images/CertificadoReconocimientoDoradoOscuro.jpg";

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

    const [signImg, setImg] = useState("");
    const [firstTime, setFirstTime] = useState("true");

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
        const titulo = "Constancia de acreditacion de evento formativo"
        const course_name = String(curso.tipo)+" "+String(curso.nombre);
        const duration = "Por haber cumplido las "+String(curso.duracion)+" horas del evento "+String(curso.nombre)+" de tipo "+String(curso.tipo);
        const consejo = "El consejo de la " + String(curso.consejo) + " acredita a ";
        const fecha = "El cual tuvo lugar desde "+String(curso.fechainicio)+" hasta "+String(curso.fechafinal);
        const coso = "Consejo de la "+String(curso.consejo)

        let student_name = students[startIndex].name + " ";
        student_name += students[startIndex].father_last + " ";
        student_name += students[startIndex].mother_last;

        doc.setFontSize(20);
        doc.text(titulo, 78, 40);
        doc.text(consejo, 95, 50);
        doc.setFontSize(25);
        doc.text(student_name, 105, 70);
        doc.setFontSize(20);
        doc.text(duration, 45, 90);
        doc.text(fecha, 74, 110);
        
        if (signImg !== "") {
            let sign = new Image();
            sign.src = signImg;

            doc.addImage(signImg, 'PNG', 110, 140, 80, 40);
        }

        console.log(students);
        console.log(startIndex);
        console.log(endIndex);

        for(let i = parseInt(startIndex) + 1; i <= parseInt(endIndex); i++) {
            doc.addPage();            

            student_name = students[i].name + " ";
            student_name += students[i].father_last + " ";
            student_name += students[i].mother_last;
            doc.setFontSize(20);
            doc.text(titulo, 78, 40);
            doc.text(consejo, 95, 50);
            doc.setFontSize(25);
            doc.text(student_name, 105, 70);
            doc.setFontSize(20);
            doc.text(duration, 45, 90);
            doc.text(fecha, 74, 110);

            if (signImg !== "") doc.addImage(signImg, 'PNG', 110, 140, 80, 40);

        }

        doc.save("constancias.pdf");
    }

    const [show, setShow] = useState(false);

    
    const handleClose = () => {
        setShow(false);
    }

    function handleShow() {
        setShow(true);
    }

    const imgLoaded = (e) => {
        let reader = e.target;

        if (reader.readyState === 2) {
            let img = reader.result;

            setImg(img);
        }
    }

    const saveStudents = () => {
        setShow(true);

        let fileReader;
        let imgReader;

        let uploadedFiles = document.getElementById('fileUpload').files;
        if (uploadedFiles !== null && 
            uploadedFiles[0] !== null && uploadedFiles[1] !== null) {
            
            fileReader = new FileReader();
            imgReader = new FileReader();

            imgReader.onload = function (e) {
                imgLoaded(e);
                fileReader.addEventListener('load', fileLoaded);
            }

            if (uploadedFiles[0].type === "image/png") {
                imgReader.readAsDataURL(uploadedFiles[0]);
                fileReader.readAsText(uploadedFiles[1]);
            } else {
                imgReader.readAsDataURL(uploadedFiles[1]);
                fileReader.readAsText(uploadedFiles[0]);
            }

        
        } 
    }

    const fileLoaded = async (e) => {
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

                if(firstTime === "true" ) {
                    setFirstTime("second");
                    saveStudents();
                } else if (firstTime === "second") {
                    generatePDFS(students, start, end);
                }

            } else {
                console.log("reader not ready.");
            }
    }


    return (
        <div className = "w-100 h-100" id="student_page">
            <div className="align-items-left ms-3">
                <h3>Generar Constancias de Acreditación</h3>
                <h4>Insertar rango de alumnos que serán seleccionados del archivo .csv de alumnos</h4>
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
                            Archivo .csv de alumnos y firma en .png:
                            <br></br>
                            <input type="file" id="fileUpload" name="file" accept=".csv, .png" multiple="multiple"></input>
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
