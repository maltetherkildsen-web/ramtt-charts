// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import type { TreemapNode } from '@/lib/charts/utils/treemap'

// ─── S&P 500 Market Treemap — ~120 companies ───

interface Company {
  ticker: string
  name: string
  marketCap: number   // billions
  change: number      // daily % change as decimal (-0.03 = -3%)
}

interface Sector {
  name: string
  companies: Company[]
}

const SECTORS: Sector[] = [
  {
    name: 'Technology',
    companies: [
      { ticker: 'AAPL', name: 'Apple', marketCap: 3200, change: -0.017 },
      { ticker: 'MSFT', name: 'Microsoft', marketCap: 3100, change: 0.009 },
      { ticker: 'NVDA', name: 'NVIDIA', marketCap: 2800, change: -0.001 },
      { ticker: 'GOOG', name: 'Alphabet', marketCap: 2100, change: 0.001 },
      { ticker: 'META', name: 'Meta', marketCap: 1400, change: 0.018 },
      { ticker: 'AVGO', name: 'Broadcom', marketCap: 800, change: 0.003 },
      { ticker: 'ORCL', name: 'Oracle', marketCap: 420, change: 0.036 },
      { ticker: 'CRM', name: 'Salesforce', marketCap: 280, change: 0.003 },
      { ticker: 'AMD', name: 'AMD', marketCap: 260, change: 0.051 },
      { ticker: 'ADBE', name: 'Adobe', marketCap: 240, change: -0.012 },
      { ticker: 'INTC', name: 'Intel', marketCap: 120, change: 0.033 },
      { ticker: 'NOW', name: 'ServiceNow', marketCap: 190, change: 0.006 },
      { ticker: 'CSCO', name: 'Cisco', marketCap: 230, change: 0.012 },
      { ticker: 'IBM', name: 'IBM', marketCap: 200, change: 0.015 },
      { ticker: 'AMAT', name: 'Applied Materials', marketCap: 150, change: -0.014 },
      { ticker: 'MU', name: 'Micron', marketCap: 130, change: 0.006 },
      { ticker: 'LRCX', name: 'Lam Research', marketCap: 110, change: -0.005 },
      { ticker: 'KLAC', name: 'KLA Corp', marketCap: 95, change: -0.018 },
      { ticker: 'ADI', name: 'Analog Devices', marketCap: 105, change: 0.013 },
      { ticker: 'PLTR', name: 'Palantir', marketCap: 85, change: -0.008 },
      { ticker: 'SNPS', name: 'Synopsys', marketCap: 75, change: 0.004 },
      { ticker: 'CRWD', name: 'CrowdStrike', marketCap: 70, change: 0.009 },
      { ticker: 'PANW', name: 'Palo Alto', marketCap: 65, change: -0.003 },
      { ticker: 'MRVL', name: 'Marvell', marketCap: 60, change: 0.021 },
      { ticker: 'TXN', name: 'Texas Instruments', marketCap: 180, change: 0.021 },
      { ticker: 'QCOM', name: 'Qualcomm', marketCap: 175, change: -0.011 },
    ],
  },
  {
    name: 'Consumer Cyclical',
    companies: [
      { ticker: 'AMZN', name: 'Amazon', marketCap: 2100, change: -0.009 },
      { ticker: 'TSLA', name: 'Tesla', marketCap: 820, change: -0.018 },
      { ticker: 'HD', name: 'Home Depot', marketCap: 380, change: -0.002 },
      { ticker: 'MCD', name: "McDonald's", marketCap: 210, change: 0.003 },
      { ticker: 'NKE', name: 'Nike', marketCap: 140, change: -0.019 },
      { ticker: 'LOW', name: "Lowe's", marketCap: 150, change: 0.004 },
      { ticker: 'SBUX', name: 'Starbucks', marketCap: 110, change: -0.007 },
      { ticker: 'TJX', name: 'TJX Cos', marketCap: 120, change: 0.005 },
      { ticker: 'BKNG', name: 'Booking', marketCap: 150, change: 0.011 },
      { ticker: 'MAR', name: 'Marriott', marketCap: 75, change: -0.003 },
      { ticker: 'ORLY', name: "O'Reilly", marketCap: 65, change: 0.008 },
      { ticker: 'AZO', name: 'AutoZone', marketCap: 55, change: 0.002 },
      { ticker: 'RCL', name: 'Royal Caribbean', marketCap: 50, change: -0.014 },
      { ticker: 'GM', name: 'General Motors', marketCap: 55, change: -0.006 },
      { ticker: 'F', name: 'Ford', marketCap: 45, change: -0.011 },
    ],
  },
  {
    name: 'Healthcare',
    companies: [
      { ticker: 'LLY', name: 'Eli Lilly', marketCap: 780, change: 0.002 },
      { ticker: 'UNH', name: 'UnitedHealth', marketCap: 520, change: -0.014 },
      { ticker: 'JNJ', name: 'Johnson & Johnson', marketCap: 380, change: 0.003 },
      { ticker: 'ABBV', name: 'AbbVie', marketCap: 340, change: 0.007 },
      { ticker: 'MRK', name: 'Merck', marketCap: 280, change: -0.023 },
      { ticker: 'PFE', name: 'Pfizer', marketCap: 160, change: -0.018 },
      { ticker: 'TMO', name: 'Thermo Fisher', marketCap: 210, change: 0.011 },
      { ticker: 'ABT', name: 'Abbott', marketCap: 200, change: 0.005 },
      { ticker: 'AMGN', name: 'Amgen', marketCap: 170, change: -0.002 },
      { ticker: 'GILD', name: 'Gilead', marketCap: 110, change: -0.009 },
      { ticker: 'BMY', name: 'Bristol-Myers', marketCap: 120, change: -0.019 },
      { ticker: 'ISRG', name: 'Intuitive Surgical', marketCap: 155, change: 0.014 },
      { ticker: 'MDT', name: 'Medtronic', marketCap: 105, change: 0.003 },
      { ticker: 'DHR', name: 'Danaher', marketCap: 190, change: 0.006 },
      { ticker: 'BSX', name: 'Boston Scientific', marketCap: 120, change: 0.008 },
      { ticker: 'ELV', name: 'Elevance', marketCap: 100, change: -0.005 },
      { ticker: 'VRTX', name: 'Vertex', marketCap: 95, change: 0.017 },
    ],
  },
  {
    name: 'Financial Services',
    companies: [
      { ticker: 'BRK-B', name: 'Berkshire Hathaway', marketCap: 890, change: -0.001 },
      { ticker: 'JPM', name: 'JPMorgan Chase', marketCap: 620, change: 0.008 },
      { ticker: 'V', name: 'Visa', marketCap: 580, change: -0.003 },
      { ticker: 'MA', name: 'Mastercard', marketCap: 440, change: 0.002 },
      { ticker: 'BAC', name: 'Bank of America', marketCap: 320, change: -0.002 },
      { ticker: 'GS', name: 'Goldman Sachs', marketCap: 180, change: 0.012 },
      { ticker: 'MS', name: 'Morgan Stanley', marketCap: 160, change: -0.017 },
      { ticker: 'SCHW', name: 'Schwab', marketCap: 140, change: 0.006 },
      { ticker: 'AXP', name: 'American Express', marketCap: 170, change: -0.003 },
      { ticker: 'BLK', name: 'BlackRock', marketCap: 145, change: 0.009 },
      { ticker: 'SPGI', name: 'S&P Global', marketCap: 155, change: 0.004 },
      { ticker: 'ICE', name: 'Intercontinental Exchange', marketCap: 80, change: 0.005 },
      { ticker: 'WFC', name: 'Wells Fargo', marketCap: 200, change: -0.009 },
      { ticker: 'C', name: 'Citigroup', marketCap: 120, change: -0.005 },
      { ticker: 'CB', name: 'Chubb', marketCap: 105, change: 0.003 },
      { ticker: 'PGR', name: 'Progressive', marketCap: 130, change: 0.007 },
      { ticker: 'MMC', name: 'Marsh McLennan', marketCap: 100, change: 0.002 },
      { ticker: 'COF', name: 'Capital One', marketCap: 65, change: -0.008 },
    ],
  },
  {
    name: 'Consumer Defensive',
    companies: [
      { ticker: 'WMT', name: 'Walmart', marketCap: 580, change: 0.001 },
      { ticker: 'COST', name: 'Costco', marketCap: 370, change: 0.003 },
      { ticker: 'PG', name: 'Procter & Gamble', marketCap: 360, change: 0.002 },
      { ticker: 'KO', name: 'Coca-Cola', marketCap: 260, change: -0.002 },
      { ticker: 'PEP', name: 'PepsiCo', marketCap: 230, change: -0.005 },
      { ticker: 'PM', name: 'Philip Morris', marketCap: 195, change: -0.007 },
      { ticker: 'MDLZ', name: 'Mondelez', marketCap: 90, change: 0.003 },
      { ticker: 'CL', name: 'Colgate', marketCap: 80, change: 0.001 },
      { ticker: 'MO', name: 'Altria', marketCap: 85, change: -0.004 },
      { ticker: 'GIS', name: 'General Mills', marketCap: 42, change: 0.006 },
      { ticker: 'SJM', name: 'J.M. Smucker', marketCap: 35, change: -0.003 },
      { ticker: 'KHC', name: 'Kraft Heinz', marketCap: 45, change: -0.008 },
    ],
  },
  {
    name: 'Communication Services',
    companies: [
      { ticker: 'NFLX', name: 'Netflix', marketCap: 380, change: 0.003 },
      { ticker: 'DIS', name: 'Walt Disney', marketCap: 200, change: -0.008 },
      { ticker: 'CMCSA', name: 'Comcast', marketCap: 160, change: -0.003 },
      { ticker: 'TMUS', name: 'T-Mobile', marketCap: 240, change: 0.005 },
      { ticker: 'VZ', name: 'Verizon', marketCap: 170, change: -0.001 },
      { ticker: 'T', name: 'AT&T', marketCap: 150, change: 0.004 },
      { ticker: 'CHTR', name: 'Charter', marketCap: 55, change: -0.012 },
      { ticker: 'EA', name: 'EA', marketCap: 40, change: 0.009 },
      { ticker: 'TTWO', name: 'Take-Two', marketCap: 30, change: 0.006 },
      { ticker: 'WBD', name: 'Warner Bros', marketCap: 25, change: -0.021 },
    ],
  },
  {
    name: 'Energy',
    companies: [
      { ticker: 'XOM', name: 'Exxon Mobil', marketCap: 480, change: 0.015 },
      { ticker: 'CVX', name: 'Chevron', marketCap: 290, change: 0.014 },
      { ticker: 'COP', name: 'ConocoPhillips', marketCap: 140, change: 0.009 },
      { ticker: 'SLB', name: 'Schlumberger', marketCap: 80, change: 0.008 },
      { ticker: 'EOG', name: 'EOG Resources', marketCap: 70, change: 0.012 },
      { ticker: 'MPC', name: 'Marathon Petroleum', marketCap: 65, change: 0.006 },
      { ticker: 'PSX', name: 'Phillips 66', marketCap: 55, change: 0.004 },
      { ticker: 'WMB', name: 'Williams Cos', marketCap: 50, change: 0.003 },
      { ticker: 'OKE', name: 'ONEOK', marketCap: 45, change: -0.002 },
      { ticker: 'VLO', name: 'Valero', marketCap: 42, change: 0.011 },
      { ticker: 'HES', name: 'Hess', marketCap: 48, change: 0.005 },
    ],
  },
  {
    name: 'Industrials',
    companies: [
      { ticker: 'GE', name: 'GE Aerospace', marketCap: 220, change: -0.027 },
      { ticker: 'CAT', name: 'Caterpillar', marketCap: 190, change: 0.004 },
      { ticker: 'UNP', name: 'Union Pacific', marketCap: 160, change: 0.006 },
      { ticker: 'HON', name: 'Honeywell', marketCap: 140, change: -0.004 },
      { ticker: 'RTX', name: 'RTX Corp', marketCap: 150, change: -0.013 },
      { ticker: 'DE', name: 'Deere & Co', marketCap: 120, change: 0.002 },
      { ticker: 'BA', name: 'Boeing', marketCap: 130, change: -0.019 },
      { ticker: 'LMT', name: 'Lockheed Martin', marketCap: 120, change: 0.005 },
      { ticker: 'ETN', name: 'Eaton', marketCap: 115, change: 0.008 },
      { ticker: 'NOC', name: 'Northrop Grumman', marketCap: 75, change: 0.003 },
      { ticker: 'GD', name: 'General Dynamics', marketCap: 80, change: 0.006 },
      { ticker: 'ITW', name: 'Illinois Tool Works', marketCap: 72, change: -0.002 },
      { ticker: 'WM', name: 'Waste Management', marketCap: 85, change: 0.004 },
      { ticker: 'FDX', name: 'FedEx', marketCap: 65, change: -0.011 },
      { ticker: 'UPS', name: 'UPS', marketCap: 95, change: -0.006 },
      { ticker: 'PH', name: 'Parker Hannifin', marketCap: 80, change: 0.007 },
    ],
  },
  {
    name: 'Utilities',
    companies: [
      { ticker: 'NEE', name: 'NextEra Energy', marketCap: 160, change: 0.007 },
      { ticker: 'SO', name: 'Southern Co', marketCap: 90, change: 0.003 },
      { ticker: 'DUK', name: 'Duke Energy', marketCap: 85, change: 0.002 },
      { ticker: 'CEG', name: 'Constellation', marketCap: 70, change: 0.019 },
      { ticker: 'SRE', name: 'Sempra', marketCap: 52, change: -0.003 },
      { ticker: 'AEP', name: 'AEP', marketCap: 48, change: 0.001 },
      { ticker: 'D', name: 'Dominion', marketCap: 45, change: -0.002 },
      { ticker: 'PCG', name: 'PG&E', marketCap: 42, change: 0.004 },
    ],
  },
  {
    name: 'Real Estate',
    companies: [
      { ticker: 'PLD', name: 'Prologis', marketCap: 110, change: -0.006 },
      { ticker: 'AMT', name: 'American Tower', marketCap: 100, change: -0.004 },
      { ticker: 'EQIX', name: 'Equinix', marketCap: 80, change: 0.005 },
      { ticker: 'CCI', name: 'Crown Castle', marketCap: 45, change: -0.008 },
      { ticker: 'WELL', name: 'Welltower', marketCap: 55, change: 0.006 },
      { ticker: 'SPG', name: 'Simon Property', marketCap: 50, change: -0.003 },
      { ticker: 'DLR', name: 'Digital Realty', marketCap: 45, change: 0.009 },
      { ticker: 'O', name: 'Realty Income', marketCap: 48, change: 0.001 },
    ],
  },
  {
    name: 'Basic Materials',
    companies: [
      { ticker: 'LIN', name: 'Linde', marketCap: 220, change: 0.006 },
      { ticker: 'SHW', name: 'Sherwin-Williams', marketCap: 85, change: 0.003 },
      { ticker: 'APD', name: 'Air Products', marketCap: 65, change: -0.004 },
      { ticker: 'FCX', name: 'Freeport-McMoRan', marketCap: 60, change: 0.018 },
      { ticker: 'ECL', name: 'Ecolab', marketCap: 55, change: 0.002 },
      { ticker: 'NEM', name: 'Newmont', marketCap: 50, change: 0.012 },
      { ticker: 'DD', name: 'DuPont', marketCap: 35, change: -0.005 },
      { ticker: 'NUE', name: 'Nucor', marketCap: 38, change: 0.009 },
      { ticker: 'CF', name: 'CF Industries', marketCap: 25, change: -0.007 },
    ],
  },
]

/**
 * Generate S&P 500 market treemap data as flat TreemapNode array.
 * ~120 companies across 11 sectors.
 */
export function generateSP500Data(): TreemapNode[] {
  const nodes: TreemapNode[] = []

  for (const sector of SECTORS) {
    const sectorId = sector.name.toLowerCase().replace(/[^a-z]/g, '-')

    nodes.push({
      id: sectorId,
      label: sector.name,
      value: sector.companies.reduce((s, c) => s + c.marketCap, 0),
      parentId: null,
    })

    for (const company of sector.companies) {
      nodes.push({
        id: company.ticker,
        label: company.ticker,
        value: company.marketCap,
        parentId: sectorId,
        colorValue: company.change * 100, // raw pct: 0.015 → 1.5
        meta: {
          name: company.name,
          ticker: company.ticker,
          marketCap: company.marketCap,
          change: company.change,
          summary: `$${company.marketCap}B market cap`,
        },
      })
    }
  }

  return nodes
}
