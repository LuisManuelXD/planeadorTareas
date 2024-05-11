export type Tasks = {
  email: string;
  name: string;
  showData: boolean;
};

function Task({ name, email, showData }: Tasks) {
    return (
      <section className="dataContainer">
        {showData && (
          <>
            <p>Nombre: {name}</p>
            <p>Email: {email}</p>
          </>
        )}
      </section>
    );
  }
  
  export default Task;
  