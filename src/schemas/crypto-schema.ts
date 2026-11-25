import { z } from "zod";

export const CurrencySchema = z.object({
  code: z.string(),
  name: z.string(),
});

// Respuesta de CoinGecko: GET /coins/markets
export const CryptoMarketSchema = z.object({
  id: z.string(),
  symbol: z.string(),
  name: z.string(),
  image: z.string(),
  current_price: z.number(),
  high_24h: z.number().nullable(),
  low_24h: z.number().nullable(),
  price_change_percentage_24h: z.number().nullable(),
  last_updated: z.string(),
});

export const CryptoMarketsResponseSchema = z.array(CryptoMarketSchema);

export const CryptoCurrencySchema = CryptoMarketSchema.pick({
  id: true,
  symbol: true,
  name: true,
});

export const PairSchema = z.object({
  currency: z.string(),
  criptoCurrency: z.string(),
});

// Datos ya formateados que muestra la interfaz
export const CryptoPriceSchema = z.object({
  image: z.string(),
  price: z.string(),
  highDay: z.string(),
  lowDay: z.string(),
  change24h: z.string(),
  lastUpdate: z.string(),
});
