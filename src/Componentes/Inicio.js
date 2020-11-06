import React, { Component } from "react";
import axios from "axios";
import Global from "./../Global";

export default class Inicio extends Component {
  cajaNombreRef = React.createRef();
  state = {
    repos: [],
    status: false,
    mensaje: "",
  };

  cargarRepositorios = (e) => {
    e.preventDefault();
    let nombre = this.cajaNombreRef.current.value;
    if (nombre === "") {
      this.setState({ mensaje: "El usuario no puede estar vacio" });
    } else {
      let request = "users/" + nombre + "/repos";
      axios.get(Global.github + request).then((res) => {
        this.setState({ repos: res.data, status: true });
      });
    }
  };
  limpiar = () => {
    this.setState({ status: false });
  };
  render() {
    return (
      <div>
        <h1>Find Repositories</h1>
        <h2 style={{ color: "red" }}>{this.state.mensaje}</h2>
        <form onSubmit={this.cargarRepositorios}>
          <label>Usuario GitHub</label>
          <br />
          <input type="text" ref={this.cajaNombreRef} name="cajaNombre" />
          <br />
          <button>Buscar</button>
        </form>
        {this.state.status && (
          <React.Fragment>
            <button onClick={this.limpiar}>limpiar</button>
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                </tr>
              </thead>
              <tbody>
                {this.state.repos.map((repo, index) => {
                  return (
                    <tr key={index}>
                      <td>{repo.name}</td>
                      <td>
                        <a href={repo.html_url} target="_blank">
                          {repo.html_url}
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </React.Fragment>
        )}
      </div>
    );
  }
}
