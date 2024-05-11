export type DataProps = {
  name: string;
  email: string;
  showData: boolean;
};

function Data({ name, email, showData }: DataProps) {
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

export default Data;
