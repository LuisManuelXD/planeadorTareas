import { useState } from "react";

function Login() {
  const [count, setCount] = useState(0);

  return (
      <form className="form-control bg-dark-subtle">
        <h2 className="">Login</h2>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Correo electronico</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Contraseña</label>
        </div>
        <button type="submit" className="btn btn-primary btn-lg mt-3">
          Ingresar
        </button>
      </form>
  );
}

export default Login;