import CriptoSearchForm from "./components/CriptoSearchForm";

function App() {
  return (
    <>
      <div className="container">
        <h1 className="app-title">
          Contizador de <span>Cripto Monedas </span>
        </h1>
        <div className="content">
          <CriptoSearchForm />
        </div>
      </div>
    </>
  );
}

export default App;
