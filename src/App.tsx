import { useState } from "react";
import Login from "./components/Login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <section className="container bg-dark-subtle p-4 mt-lg-5 mb-lg-5">
      <Login />
    </section>
  );
}

export default App;
