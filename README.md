# Cotizador de Criptomonedas

Aplicación web que muestra la cotización actual de una criptomoneda en la moneda que elija el usuario. Usa la API pública de [CryptoCompare](https://min-api.cryptocompare.com/).

## Funcionalidades

- Carga automática de las 20 criptomonedas con mayor capitalización de mercado.
- Selección de la moneda de cotización: dólar (USD), peso mexicano (MXN), euro (EUR) o libra esterlina (GBP).
- Muestra:
  - Precio actual
  - Precio más alto y más bajo del día
  - Variación en las últimas 24 horas
  - Última actualización
- Validación de las respuestas de la API con Zod.
- Estado global con Zustand.

## Tecnologías

- React + TypeScript + Vite
- Zustand
- Axios
- Zod

## Estructura

```
src/
├── components/   # CriptoSearchForm, CryptoPriceDisplay, ErrorMessage
├── data/         # Monedas disponibles
├── schemas/      # Esquemas Zod de las respuestas
├── services/     # Peticiones a CryptoCompare
├── store.ts      # Store de Zustand
└── types/
```

## Cómo ejecutarlo

```bash
npm install
npm run dev
```

No necesita variables de entorno.

| Script            | Descripción                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Servidor de desarrollo            |
| `npm run build`   | Compila TypeScript y genera build |
| `npm run preview` | Sirve el build de producción      |
| `npm run lint`    | Ejecuta ESLint                    |
