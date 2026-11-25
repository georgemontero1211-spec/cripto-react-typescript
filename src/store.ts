import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { isAxiosError } from "axios";
import { fetchCurrentCryptoPrice, getCryptos } from "./services/CryptoService";
import type { CryptoCurrency, CryptoPrice, Pair } from "./types";

type CryptoStore = {
  cryptoCurrencies: CryptoCurrency[];
  result: CryptoPrice;
  loading: boolean;
  apiError: string;
  fetchCryptos: () => Promise<void>;
  fetchData: (pair: Pair) => Promise<void>;
};

const errorMessage = (error: unknown) =>
  isAxiosError(error) && error.response?.status === 429
    ? "Se alcanzó el límite de consultas de la API. Espera un minuto e inténtalo de nuevo."
    : "No se pudo obtener la información. Inténtalo de nuevo más tarde.";

export const useCriptoStore = create<CryptoStore>()(
  devtools((set) => ({
    cryptoCurrencies: [],
    result: {} as CryptoPrice,
    loading: false,
    apiError: "",
    fetchCryptos: async () => {
      try {
        const cryptoCurrencies = await getCryptos();
        set(() => ({ cryptoCurrencies, apiError: "" }));
      } catch (error) {
        set(() => ({ apiError: errorMessage(error) }));
      }
    },
    fetchData: async (pair) => {
      set(() => ({ loading: true, apiError: "" }));
      try {
        const result = await fetchCurrentCryptoPrice(pair);
        if (result) set(() => ({ result }));
      } catch (error) {
        set(() => ({ apiError: errorMessage(error) }));
      } finally {
        set(() => ({ loading: false }));
      }
    },
  }))
);
