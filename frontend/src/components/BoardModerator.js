import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import Cursos from "./Cursos";
import { BrowserRouter } from "react-router-dom";

const BoardModerator = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getModeratorBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  return (
    <div>
      <div>
        <div className="jumbotron jumbotron-fluid">
          <div className="container justify-content-center align-items-center h-100">
            <h1 className="display-4">Panel de Moderador</h1>
            <p className="lead">
            Puedes agregar, modificar y eliminar Eventos Formativos.
            </p>
          </div>
        </div>
      </div>

      <BrowserRouter>
        <Cursos />
      </BrowserRouter>    
    </div>
  );
};

export default BoardModerator;
