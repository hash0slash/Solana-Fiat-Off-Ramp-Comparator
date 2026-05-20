# Solana Fiat Off-Ramp Comparator

## Overview

A web application that helps users find the cheapest way to convert Solana to fiat currency. Users input their withdrawal amount and select their target currency, and the tool compares fees and withdrawal limits across multiple exchanges and on-ramp services.

**Problem:** When converting Solana to fiat, users face fragmented options with wildly different fees, withdrawal limits, and processing times. Wallets like Backpack enforce high minimums ($100+), forcing manual transfers between platforms. There's no single tool showing all available routes ranked by cost.

**Solution:** Aggregate real-time fee data from major exchanges and on-ramp services, display results ranked by lowest fees, and help users make informed decisions instantly.

## Tech Stack

- **Frontend:** React 18+ with JavaScript
- **UI Framework:** Custom CSS using CSS variables for light/dark mode support
- **Data Sources:** Integration with Ramp, MoonPay, Transak, CoinDCX, WazirX APIs (production)
- **Deployment:** Vercel/Netlify ready

## Current Features (MVP)

✓ User input for withdrawal amount and currency
✓ Support for USD, EUR, GBP, INR (extensible to 50+ currencies)
✓ Comparison table ranked by lowest fees
✓ Fee calculation and net amount display
✓ Settlement time and withdrawal limit visibility
✓ Professional, responsive UI with dark mode support

## Features Coming (Production)

- [ ] Real-time API integration with Ramp, MoonPay, Transak
- [ ] Solana wallet connection (Phantom, Backpack)
- [ ] User geolocation for automatic currency detection
- [ ] Historical fee tracking and price alerts
- [ ] Favorites/saved routes
- [ ] Additional payment methods (bank transfers, SEPA, ACH)
- [ ] Multi-token support (not just SOL)

## Setup Instructions

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
git clone <repo-url>
cd solana-offramp-comparator
npm install
```

### Running Locally

```bash
npm start
```

The app will open at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   └── SolanaOffRampComparator.jsx    # Main comparison component
├── App.js                              # Entry point
└── index.js                            # React root

public/
└── index.html
```

## API Integration Notes

### Ramp
- Real-time fee rates and limits vary by region
- Supports 160+ countries, 30+ fiat currencies
- Production will use `getRamps()` API endpoint

### MoonPay
- Global coverage with 160+ countries
- Fees: 1-4.5% depending on method/region
- Production will use MoonPay API with developer credentials

### Transak
- 64+ countries, 136+ cryptocurrencies
- Webhook support for transaction status
- Production will query fee rates via `/api/rates` endpoint

### CoinDCX (India-focused)
- Direct INR trading pairs
- Margin trading available
- API integration for current withdrawal fees

### WazirX (India-focused)
- Competitive INR rates (0% fee option)
- Fast settlement (10-30 minutes)
- Web3 mode integration planned

## Roadmap

**Week 1:** Research and API documentation review
**Week 2:** Backend aggregation logic and database setup
**Week 3:** Frontend refinement and Solana wallet integration
**Week 4:** Testing, deployment, and production launch

## Future Monetization

- Small fee per successful conversion (0.1-0.5%)
- Premium features (price alerts, advanced routing)
- B2B API access for wallets/exchanges

## License

MIT

## Contact

Built for Superteam's Agentic Engineering Grant Program
