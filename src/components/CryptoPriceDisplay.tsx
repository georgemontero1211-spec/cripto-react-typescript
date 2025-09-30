import { useMemo } from "react";
import { useCriptoStore } from "../store";

export default function CryptoPriceDisplay() {
  const result = useCriptoStore((state) => state.result);
  const hasResult = useMemo(
    () => !Object.values(result).includes(""),
    [result]
  );

  return (
    <div className="result-wrapper">
      {hasResult && (
        <>
          <h2>Corizacion</h2>
          <div className="result">
            <img
              src={`https://cryptocompare.com/${result.IMAGEURL}`}
              alt="Imagen CriptoMoneda"
            />
            <div>
              <p>
                El precio es de: <span>{result.PRICE}</span>
              </p>
              <p>
                Precio mas alto del dia: <span>{result.HIGHDAY}</span>
              </p>
              <p>
                Precio mas bajo del dia: <span>{result.LOWDAY}</span>
              </p>
              <p>
                Ultima actualizacion: <span>{result.LASTUPDATE}</span>
              </p>
              <p>
                Variacion ultimas 24h:<span>{result.CHANGEPCT24HOUR}</span>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
