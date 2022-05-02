import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveUsers,
  findUsersByApellido,
} from "../actions/admin";

const UserList = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchApellido, setSearchApellido] = useState("");
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(retrieveUsers());
  }, []);
  const onChangeSearchApellido = e => {
    const searchApellido = e.target.value;
    setSearchApellido(searchApellido);
  };
  const refreshData = () => {
    setCurrentUser(null);
    setCurrentIndex(-1);
  };
  const setActiveUser = (user, index) => {
    setCurrentUser(user);
    setCurrentIndex(index);
  };

  const findByApellido = () => {
    refreshData();
    dispatch(findUsersByApellido(searchApellido));
  };
  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar"
            value={searchApellido}
            onChange={onChangeSearchApellido}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByApellido}
            >
              Buscar
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Lista de Usuarios</h4>
        <ul className="list-group">
          {users &&
            users.map((someUser, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveUser(someUser, index)}
                key={index}
              >
                { someUser.nombre + " " + someUser.apellido_p + " " + someUser.apellido_m}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentUser ? (
          <div>
            <h4>Usuario</h4>

            <div>
              <label>
                <strong>ID: </strong>
              </label>{" "}
              {currentUser.id}
            </div>

            <div>
              <label>
                <strong>User:</strong>
              </label>{" "}
              {currentUser.username}
            </div>

            <div>
              <label>
                <strong>Nombre:</strong>
              </label>{" "}
              {currentUser.nombre + " " + currentUser.apellido_p + " " + currentUser.apellido_m}
            </div>

            <div>
              <label>
                <strong>Correo:</strong>
              </label>{" "}
              {currentUser.email}
            </div>

            <Link
              to={"/mod/get/" + currentUser.id}
              className="badge badge-warning"
            >
              Editar
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Haga clic en algún Usuario...</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default UserList;
