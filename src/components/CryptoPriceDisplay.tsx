import { useMemo } from "react";
import { useCriptoStore } from "../store";

export default function CryptoPriceDisplay() {
  const result = useCriptoStore((state) => state.result);
  const hasResult = useMemo(() => Object.keys(result).length > 0, [result]);

  return (
    <div className="result-wrapper">
      {hasResult && (
        <>
          <h2>Cotización</h2>
          <div className="result">
            <img src={result.image} alt="Imagen CriptoMoneda" />
            <div>
              <p>
                El precio es de: <span>{result.price}</span>
              </p>
              <p>
                Precio mas alto del dia: <span>{result.highDay}</span>
              </p>
              <p>
                Precio mas bajo del dia: <span>{result.lowDay}</span>
              </p>
              <p>
                Ultima actualizacion: <span>{result.lastUpdate}</span>
              </p>
              <p>
                Variacion ultimas 24h: <span>{result.change24h}</span>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
