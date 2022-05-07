import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { createMod } from "../actions/admin";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { isEmail } from "validator";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Necesario llenar!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        El correo no es valido.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Ingrese entre 3 y 20 caracteres.
      </div>
    );
  }
};

const vnombre = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Ingrese entre 3 y 20 caracteres.
      </div>
    );
  }
};

const vapellido_p = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Ingrese entre 3 y 20 caracteres.
      </div>
    );
  }
};

const vapellido_m = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Ingrese entre 3 y 20 caracteres.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 3 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        Ingrese entre 3 y 20 caracteres.
      </div>
    );
  }
};

const AddUser = () => {

  const form = useRef();

  const initialUserState = {
    id: null,
    username: "",
    nombre: "",
    apellido_p: "",
    apellido_m: "",
    email: "",
    password: "",
  };
  const [user, setUser] = useState(initialUserState);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const saveUser = () => {
    const { username, nombre, apellido_p, apellido_m, email, password } = user;
    dispatch(
      createMod(username, nombre, apellido_p, apellido_m, email, password)
    )
      .then((data) => {
        setUser({
          id: data.id,
          nombre: data.nombre,
          apellido_p: data.apellido_p,
          apellido_m: data.apellido_m,
          email: data.email,
          password: data.password,
        });
        setSubmitted(true);
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newUser = () => {
    setUser(initialUserState);
    setSubmitted(false);
  };
  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Se agregó correctamente!</h4>
          <button className="btn btn-success" onClick={newUser}>
            Agregar
          </button>
        </div>
      ) : (
        <div>
          <Form onSubmit={saveUser} ref={form}>
            <div className="form-group">
              <label htmlFor="username">Usuario</label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={user.username}
                onChange={handleInputChange}
                validations={[required, vusername]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <Input
                type="text"
                className="form-control"
                name="nombre"
                value={user.nombre}
                onChange={handleInputChange}
                validations={[required, vnombre]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="apellido_p">Apellido Paterno</label>
              <Input
                type="text"
                className="form-control"
                name="apellido_p"
                value={user.apellido_p}
                onChange={handleInputChange}
                validations={[required, vapellido_p]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="apellido_p">Apellido Materno</label>
              <Input
                type="text"
                className="form-control"
                name="apellido_m"
                value={user.apellido_m}
                onChange={handleInputChange}
                validations={[required, vapellido_m]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo</label>
              <Input
                type="text"
                className="form-control"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                validations={[required, validEmail]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={user.password}
                onChange={handleInputChange}
                validations={[required, vpassword]}
              />
            </div>

          </Form>

          <button
            type="submit"
            className="btn btn-success"
            onClick={saveUser}
          >
           Agregar
          </button>
        </div>
      )}
    </div>
  );
};
export default AddUser;
