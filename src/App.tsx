import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import RegistrarUsuario from "./components/login/RegistrarUsuario";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="container bg-dark-subtle p-4 mt-lg-5 mb-lg-5">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registrarUsuario" element={<RegistrarUsuario />} />
      </Routes>
    </main>
  );
}

export default App;
