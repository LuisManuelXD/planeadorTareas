import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3010/";

function RegistrarUsuario() {
  const [email, setEmail] = useState<String>("");
  const [name, setName] = useState<String>("");
  const [address, setAddress] = useState<String>("");
  const [phoneNumber, setPhoneNumber] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (stateUpdate) => {
    return (event) => {
      stateUpdate(event.target.value);
    };
  };

  const registrar = async () => {
    if (!email || !name || !address || !phoneNumber || !password) {
      alert("Completa todos los campos faltantes.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}api/v1/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name,
          address,
          phoneNumber,
        }),
      });

      if (response.status === 201) {
        const data = await response.json();
        setUser(data);
        alert("Usuario registrado");
        navigate("/");
        // window.localStorage.setItem("user", JSON.stringify(data));
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error al registrar usuario");
      }
    } catch (error) {
      setError("Error de conexión al servidor");
    }
  };

  return (
    <>
      <section className="container bg-dark-subtle p-4 mt-lg-5 mb-lg-5">
        <div className="form-control bg-dark-subtle">
          <div className="container text-center">
            <img
              src="/src/assets/images/logos/logo-02.png"
              alt="Logo"
              className="m-3"
            />
          </div>
          <h3>Registrar Usuario</h3>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={handleInputChange(setEmail)}
            />
            <label htmlFor="floatingInput">Correo electronico</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="text"
              value={name}
              onChange={handleInputChange(setName)}
            />
            <label htmlFor="floatingInput">Nombre</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="text"
              value={address}
              onChange={handleInputChange(setAddress)}
            />
            <label htmlFor="floatingInput">Dirección</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="text"
              value={phoneNumber}
              onChange={handleInputChange(setPhoneNumber)}
            />
            <label htmlFor="floatingInput">Telefono</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={handleInputChange(setPassword)}
            />
            <label htmlFor="floatingInput">Contraseña</label>
          </div>
          <button className="btn btn-primary btn-lg mt-3" onClick={registrar}>
            Registrar
          </button>
          {error && <p>{error}</p>}
        </div>
      </section>
    </>
  );
}

export default RegistrarUsuario;
