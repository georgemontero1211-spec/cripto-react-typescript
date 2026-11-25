import axios from "axios";
import { CryptoMarketsResponseSchema } from "../schemas/crypto-schema";
import type { CryptoCurrency, CryptoPrice, Pair } from "../types";

// API pública de CoinGecko (no requiere API key)
const API_URL = "https://api.coingecko.com/api/v3/coins/markets";

export async function getCryptos(): Promise<CryptoCurrency[]> {
  const { data } = await axios(API_URL, {
    params: { vs_currency: "usd", order: "market_cap_desc", per_page: 20, page: 1 },
  });
  const result = CryptoMarketsResponseSchema.safeParse(data);
  if (!result.success) return [];
  return result.data.map(({ id, symbol, name }) => ({ id, symbol, name }));
}

export async function fetchCurrentCryptoPrice(pair: Pair): Promise<CryptoPrice | undefined> {
  const { data } = await axios(API_URL, {
    params: { vs_currency: pair.currency.toLowerCase(), ids: pair.criptoCurrency },
  });
  const result = CryptoMarketsResponseSchema.safeParse(data);
  if (!result.success || result.data.length === 0) return undefined;

  const coin = result.data[0];
  const money = (value: number | null) =>
    value === null
      ? "—"
      : new Intl.NumberFormat("es-DO", { style: "currency", currency: pair.currency, maximumFractionDigits: 2 }).format(value);

  return {
    image: coin.image,
    price: money(coin.current_price),
    highDay: money(coin.high_24h),
    lowDay: money(coin.low_24h),
    change24h: coin.price_change_percentage_24h === null ? "—" : `${coin.price_change_percentage_24h.toFixed(2)} %`,
    lastUpdate: new Date(coin.last_updated).toLocaleString("es-DO"),
  };
}
