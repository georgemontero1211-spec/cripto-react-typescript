import { useState, type ChangeEvent, type FormEvent } from "react";
import { currencies } from "../data";
import { useCriptoStore } from "../store";
import type { Pair } from "../types";
import ErrorMenssage from "./ErrorMenssage";

export default function CriptoSearchForm() {
  const cryptoCurrencies = useCriptoStore((state) => state.cryptoCurrencies);
  const fetchData = useCriptoStore((state) => state.fetchData);
  const [pair, setPair] = useState<Pair>({
    currency: "",
    criptoCurrency: "",
  });
  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPair({
      ...pair,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(pair).includes("")) {
      setError("Todos los campos son obligatorios");
      return;
    }
    setError("");
    //Consulta de la API
    fetchData(pair);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {error && <ErrorMenssage>{error} </ErrorMenssage>}
      <div className="field">
        <label htmlFor="currency">Moneda:</label>
        <select
          name="currency"
          id="currency"
          value={pair.currency}
          onChange={handleChange}
        >
          <option value="">-- Seleccione --</option>
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.name}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="criptoCurrency">CriptoMoneda:</label>
        <select
          name="criptoCurrency"
          id="criptoCurrency"
          value={pair.criptoCurrency}
          onChange={handleChange}
        >
          <option value="">-- Seleccione --</option>
          {cryptoCurrencies.map((crypto) => (
            <option key={crypto.CoinInfo.Name} value={crypto.CoinInfo.Name}>
              {crypto.CoinInfo.FullName}
            </option>
          ))}
        </select>
      </div>
      <input type="submit" value="cotizar" />
    </form>
  );
}
