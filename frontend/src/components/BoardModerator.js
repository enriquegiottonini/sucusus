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
      <div className="container">
        <header className="jumbotron">
          <h3>Un moderador(?), maestro, responsable de curso, etc, puede agregar, editar, eliminar cursos. Hasta ahora ...</h3>
        </header>
      </div>

      <BrowserRouter>
        <Cursos />
      </BrowserRouter>
      
    </div>
  );
};

export default BoardModerator;
