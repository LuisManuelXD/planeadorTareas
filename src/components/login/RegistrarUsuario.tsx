import { useEffect, useState } from "react";

const API_URL = "http://localhost:3010/";


function RegistrarUsuario() {
  const [email, setEmail] = useState<String>('');
  const [password, setPassword] = useState<String>('');
  const [error, setError] = useState('');

  const registrarUsuario = async () => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="form-control bg-dark-subtle">
        <div className="container text-center">
        <img src="/src/assets/images/logos/logo-02.png" alt="Logo" className="m-3"/>
      </div>
      <h3>Registrar Usuario</h3>
      <div className="form-floating mb-3">
        <input
            type="text"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="floatingInput">Correo electronico</label>
      </div>
      <div className="form-floating mb-3">
        <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="floatingInput">Contraseña</label>
      </div>
      <button className="btn btn-primary btn-lg mt-3" onClick={registrarUsuario}>Registrar</button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default RegistrarUsuario;