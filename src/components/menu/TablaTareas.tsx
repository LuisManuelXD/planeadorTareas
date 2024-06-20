import { useState } from "react";

function TablaTareas() {
    const [tareas, setTareas] = useState<Tarea[]>([]);

    useEffect(() => {
        const fetchTareas = async () => {
            const response = await fetch('http://localhost:3001/tareas');
            const data = await response.json();
            setTareas(data);
        };
        fetchTareas();
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                </tr>
            </thead>
            <tbody>
                {tareas.map((tarea) => (
                    <tr key={tarea.id}>
                        <td>{tarea.nombre}</td>
                        <td>{tarea.descripcion}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}