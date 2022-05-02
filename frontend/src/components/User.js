import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateUser, deleteUser } from "../actions/admin";
import AdminService from "../services/AdminService";

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
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        Ingrese entre 3 y 20 caracteres.
      </div>
    );
  }
};

const User = (props) => {

  const form = useRef();

  const initialUserState = {
    id: null,
    nombre: "",
    apellido_p: "",
    apellido_m: "",
    email: "",
    password: "",
  };
  const [currentUser, setCurrentUser] = useState(initialUserState);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const getUser = (id) => {
    AdminService.get(id)
      .then((response) => {
        setCurrentUser(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getUser(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const updateAnUser = () => {
    dispatch(updateUser(currentUser.id, currentUser))
      .then((response) => {
        console.log(response);
        setMessage("Se agregó al usuario correctamente!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const removeUser = () => {
    dispatch(deleteUser(currentUser.id))
      .then(() => {
        props.history.push("/mod");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      {currentUser ? (
        <div className="edit-form">
          <h4>User</h4>
          <Form onSubmit={updateAnUser} ref={form}>

            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <Input
                type="text"
                className="form-control"
                name="nombre"
                value={currentUser.nombre}
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
                value={currentUser.apellido_p}
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
                value={currentUser.apellido_m}
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
                value={currentUser.email}
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
                value={currentUser.password}
                onChange={handleInputChange}
                validations={[required, vpassword]}
              />
            </div>
          </Form>

          <button className="badge badge-danger mr-2" onClick={removeUser}>
            Eliminar Cuenta
          </button>
          <button
            type="submit"
            className="badge badge-success"
            onClick={updateAnUser}
          >
            Actualizar
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Haga clic en algún Usuario...</p>
        </div>
      )}
    </div>
  );
};
export default User;
