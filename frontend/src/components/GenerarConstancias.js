import 'bootstrap/dist/css/bootstrap.css';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, {useState} from "react";
import { data } from 'jquery';

let studentsArr;

const GenerarConstancias = () => {

    function student(name, father_last, mother_last, id) {
        const stu = new Object();

        stu.name = name;
        stu.father_last = father_last;
        stu.mother_last = mother_last;
        stu.id = id;
        
        return stu;
    }

    const [students, addStudents] = useState([]);
    const [show, setShow] = useState(false);


    const handleClose = () => {
        setShow(false);
    }

    function handleShow() {
        setShow(true);
    }

    const saveStudents = () => {
        setShow(true);

        let reader;
        if (document.getElementById('fileUpload').files != null && 
            document.getElementById('fileUpload').files[0] != null) {

            reader = new FileReader();
        
            reader.readAsText(document.getElementById('fileUpload').files[0]);

            reader.addEventListener('load', fileLoaded);
        } 

        handleClose();
        window.location.reload();
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

                    students[n] = student(name, fathers_last, mothers_last, n + 1);
                    n++;

                    console.log(name + " " + fathers_last + " " + mothers_last);
                    i = data.indexOf(',');
                }

                studentsArr = students;
            } else {
                console.log("reader not ready.");
            }
    }


    return (
        <div className = "w-100 h-100" id="student_page">
            <div className="align-items-left ms-3">
                <h3>Generar Constancias de Acreditación</h3>
            </div>
            <br></br>
            <table class="table" id="student_table">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido paterno</th>
                    <th scope="col">Apellido materno</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        students.map((st) => {
                            <tr key={st.id}>
                                <td>{st.name}</td>
                                <td>{st.father_last}</td>
                                <td>{st.mother_last}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
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
                        <div className="d-flex flex-column justify-content-end form-group col mt-3 me-3">
                            <input type="file" id="fileUpload" name="file" accept=".csv"></input>
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
                            <Link to={{pathname: `/mod/GenerarConstancias`}}>
                                <a href="#" className="btn btn-primary ml-3 float-right" >Generar constancias</a>
                            </Link> 
                            <Link to={{pathname: `/mod/GenerarConstancias`}}>
                                <a href="#" className="btn btn-primary ml-3 float-right" >Seleccionar todos</a>
                            </Link> 
                        </div>
                    </div>
                </div>
            </footer>
        </div>
);
}

export default GenerarConstancias;
