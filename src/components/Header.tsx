import { Link, useNavigate } from "react-router-dom";

function Header() {
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary container-fluid p-3">
          <Link to="/menuTareas" className="navbar-brand">
            Planeador de tareas
          </Link>
          <img
            src="/src/assets/images/logos/logo-02.png"
            alt="tareas.png"
            width="40"
          />
        </nav>
      </header>
    </>
  );
}

export default Header;
