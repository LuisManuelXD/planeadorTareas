import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import RegistrarUsuario from "./components/login/RegistrarUsuario";
import MenuTareas from "./components/menu/MenuTareas";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registrarUsuario" element={<RegistrarUsuario />} />
        <Route path="/menuTareas" element={<MenuTareas />} />
      </Routes>
    </main>
  );
}

export default App;
