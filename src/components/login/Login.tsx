import { useEffect, useState } from "react";
import Data from "../Data";
import Task from "../Task";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:3010/";

const loginData = {
  email: "correo2@gmail.com",
  password: "12345678",
};

function Login() {
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [showData, setShowData] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [tasks, setTasks] = useState<any>(null);

  useEffect(() => {
    const userInStorageString = window.localStorage.getItem("user");
    const userInStorage = JSON.parse(userInStorageString);
    setUser(userInStorage);
  }, []);

  const handleInputChange = (stateUpdate) => {
    return (event) => {
      stateUpdate(event.target.value);
    };
  };

  const handleOnClick = () => {
    // login({email, password})
    // if(showData) {
    //   setPassword("")
    //   setEmail("")
    // }

    // setShowData(!showData)
    fetchTask();
  };

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await fetch(`${API_URL}api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        setUser(data);
        window.localStorage.setItem("user", JSON.stringify(data));
      } else {
        alert("Usuario o contraseña incorrecta");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTask = async () => {
    try {
      const response = await fetch(`${API_URL}api/v1/tasks/testTasks`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const task = await response.json();
      setTasks(task);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* {user && (
        <section className="dataContainer">
          {
            <>
              <p>Email: {user.user.email}</p>
              <p>Nombre: {user.user.name}</p>
              <p>Id: {user.user.id}</p>
            </>
          }
        </section>
      )}
      <br /> */}
      {/* <table className="table table-borderless table-thead-bordered table-nowrap table-align-middle card-table">
        <thead className="thead-light">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Titulo</th>
            <th scope="col">Descripción</th>
            <th scope="col">Status</th>
            <th scope="col">Última modificación</th>
            <th scope="col">Creada en</th>
            <th scope="col">Terminar en</th>
          </tr>
        </thead>
        {tasks && (
          <tbody>
            {tasks.map((task) => (
              <tr>
                <td>{task._id}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.status}</td>
                <td>{task.lastModified}</td>
                <td>{task.createdAt}</td>
                <td>{task.endIn}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table> */}
      <div className="container text-center">
        <img src="/src/assets/images/logos/logo-02.png" alt="Logo" className="m-3"/>
      </div>
      <section className="form-control bg-dark-subtle">
        <h2 className="mt-2 mb-4">Login</h2>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="txtEmail"
            name="txtEmail"
            placeholder="name@example.com"
            value={email}
            onChange={handleInputChange(setEmail)}
          />
          <label htmlFor="floatingInput">Correo electronico</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="txtPassword"
            name="txtPassword"
            placeholder="Password"
            value={password}
            onChange={handleInputChange(setPassword)}
          />
          <label htmlFor="floatingPassword">Contraseña</label>
        </div>
        <button className="btn btn-primary btn-lg mt-3" onClick={handleOnClick}>
          Ingresar
        </button>
        <div className="mt-3">
          <p>
            ¿No tienes una cuenta?{" "}
            <Link to="/registrarUsuario" className="link-primary">
              Registrate
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

export default Login;