import { useEffect, useState } from "react";
import Data from "./Data";

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
    login({email, password})
    if(showData) {
      setPassword("")
      setEmail("")
    }

    setShowData(!showData)
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


  return (
    <>
      {user && (
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
      <br />

      <section className="form-control bg-dark-subtle">
        <h2 className="">Login</h2>
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
      </section>
    </>
  );
}

export default Login;