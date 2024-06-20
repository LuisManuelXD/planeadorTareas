import { useEffect, useState } from "react";
import Header from "../Header";
import "./index.css";

const API_URL = "http://localhost:3010/";

function MenuTareas() {
  const [id_Cliente, setId_Cliente] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [endIn, setEndIn] = useState("");
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const userInStorageString = window.localStorage.getItem("user");
    const userInStorage = JSON.parse(userInStorageString);
    setUser(userInStorage);
    setId_Cliente(userInStorage?.user?.id);

    const fetchTasks = async (userId) => {
      try {
        const response = await fetch(
          `${API_URL}api/v1/tasks/?id_user=${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${userInStorage.token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          const data = await response.json();
          setTasks(data);
        } else {
          const errorData = await response.json();
          alert(errorData.message || "Error al obtener tareas");
        }
      } catch (error) {
        alert("Error de conexión al servidor");
      }
    };

    if (userInStorage) {
      fetchTasks(userInStorage?.user?.id);
    }
  }, []);

  const handleInputChange = (stateUpdate) => {
    return (event) => {
      stateUpdate(event.target.value);
    };
  };

  const fetchUserTasks = async (userId) => {
    try {
      const response = await fetch(
        `${API_URL}api/v1/tasks/?id_user=${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        setTasks(data);
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Error al obtener tareas");
      }
    } catch (error) {
      alert("Error de conexión al servidor");
    }
  };

  const registrarTarea = async () => {
    if (!title || !description || !endIn || !id_Cliente) {
      alert("Completa todos los campos faltantes.");
      return;
    }

    const formattedEndIn = new Date(endIn).toISOString();

    try {
      const response = await fetch(`${API_URL}api/v1/tasks`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          status: "on ready",
          endIn: formattedEndIn,
          id_user: id_Cliente,
        }),
      });

      if (response.status === 201) {
        fetchUserTasks(id_Cliente);
        alert("Tarea registrada");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Error al registrar tarea");
      }
    } catch (error) {
      alert("Error de conexión al servidor");
    }
  };

  const borrarTarea = async (id) => {
    try {
      const response = await fetch(`${API_URL}api/v1/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 204) {
        fetchUserTasks(id_Cliente);
        alert("Tarea eliminada");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Error al eliminar tarea");
      }
    } catch (error) {
      alert("Error de conexión al servidor");
    }
  };

  const terminarTarea = async (id) => {
    const confirm = window.confirm("¿Quieres marcar esta tarea como terminada?");
    if (!confirm) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}api/v1/tasks/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "finished"
        })
      });

      if (response.status === 204) {
        fetchUserTasks(id_Cliente);
        alert("Tarea finalizada");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Error al marcar tarea como realizada");
      }
    } catch (error) {
      alert("Error de conexión al servidor");
    }
  }

  return (
    <>
      <Header />
      <section className="container bg-dark p-3 mt-4 mb-lg-2">
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <form id="formularioTareas" method="post">
                  <input type="hidden" id="tareaId" name="tareaId" />
                  <div className="form-group">
                    <label htmlFor="txtNombre">
                      <h4>Nombre</h4>
                    </label>
                    <input
                      type="text"
                      id="txtNombre"
                      name="txtNombre"
                      placeholder="Nombre de la tarea"
                      className="form-control shadow"
                      title="Ingrese un titulo a la tarea."
                      value={title}
                      onChange={handleInputChange(setTitle)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="txtDescripcion" className="form-label">
                      <h4 className="pt-4">Descripcion</h4>
                    </label>
                    <textarea
                      id="txtDescripcion"
                      name="txtDescripcion"
                      cols="30"
                      rows="8"
                      className="form-control shadow"
                      title="Ingrese una descripción a la tarea a realizar."
                      placeholder="Escribe tu descripción"
                      value={description}
                      onChange={handleInputChange(setDescription)}
                      required
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="txtFecha" className="form-label">
                      <h4 className="pt-4">Fecha</h4>
                    </label>
                    <input
                      id="txtFecha"
                      name="txtFecha"
                      type="date"
                      className="form-control shadow"
                      value={endIn}
                      onChange={handleInputChange(setEndIn)}
                      required
                    />
                  </div>
                  <br />
                  <input
                    type="button"
                    value="Guardar tarea"
                    className="btn btn-success btn-block text-center"
                    title="Guarda la tarea con el contenido que ingreses en los campos de texto anteriores."
                    onClick={registrarTarea}
                  />
                </form>
              </div>
            </div>
          </div>

          <div className="col-md-8 pt-4">
            <h4 className="text-center text-white fw-bold">
              Tareas por completar
            </h4>
            <table className="table table-bordered table-sm table-light text-center shadow">
              <thead className="table table-danger">
                <tr>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Fecha a terminar</th>
                  <th>Realizada</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              {tasks && (
                <tbody>
                  {tasks
                    .filter((task) => task.status === "on ready")
                    .map((task) => (
                      <tr key={task._id}>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>{task.endIn}</td>
                        <td>
                          <button
                            onClick={() => terminarTarea(task._id)}
                            className="btnTerminado btn btn-outline-success"
                            title="Presiona este botón para marcar la tarea como realizada."
                          >
                            <img
                              src="/src/assets/images/listo.png"
                              alt="listo.png"
                              width="26"
                            />
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() => borrarTarea(task._id)}
                            className="eliminarTarea btn btn-outline-danger"
                            title="Presiona este botón para eliminar esta tarea."
                          >
                            <img
                              src="/src/assets/images/eliminar.png"
                              alt="eliminar.png"
                              width="26"
                            />
                          </button>
                          <button
                            onClick={() => modificarTarea(task._id)}
                            className="btn btn-outline-danger"
                            title="Presiona este botón para modificar esta tarea."
                          >
                            <img
                              src="/src/assets/images/editar.png"
                              alt="modificar.png"
                              width="26"
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              )}
            </table>
          </div>
        </div>

        <div className="cool-md-7 pt-2">
          <h4 className="text-center text-white fw-bold">Tareas finalizadas</h4>
          <table className="table table-bordered table-sm table-light text-center shadow">
            <thead className="table table-success">
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Fecha a terminar</th>
                <th>Realizada</th>
                <th>Opciones</th>
              </tr>
            </thead>
            {tasks && (
              <tbody>
                {tasks
                  .filter((task) => task.status !== "on ready")
                  .map((task) => (
                    <tr key={task._id}>
                      <td>{task.title}</td>
                      <td>{task.description}</td>
                      <td>{task.endIn}</td>
                      <td>{task.status}</td>
                      <td>
                        <button
                          onClick={() => borrarTarea(task._id)}
                          className="eliminarTarea btn btn-outline-danger"
                          title="Presiona este botón para eliminar esta tarea."
                        >
                          <img
                            src="/src/assets/images/eliminar.png"
                            alt="eliminar.png"
                            width="26"
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            )}
          </table>
        </div>
      </section>
    </>
  );
}

export default MenuTareas;
