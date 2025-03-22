
// BCR (Benefit-Cost Ratio) Calculator
export const calculateBCR = (benefits: number, costs: number): number => {
  if (costs === 0) return 0;
  return Number((benefits / costs).toFixed(2));
};

// NPV (Net Present Value) Calculator
export const calculateNPV = (
  initialInvestment: number,
  cashFlows: number[],
  discountRate: number
): number => {
  let npv = -initialInvestment;
  
  for (let i = 0; i < cashFlows.length; i++) {
    npv += cashFlows[i] / Math.pow(1 + discountRate / 100, i + 1);
  }
  
  return Number(npv.toFixed(2));
};

// Tablet Friability Calculator
export const calculateFriability = (
  initialWeight: number,
  finalWeight: number
): number => {
  if (initialWeight === 0) return 0;
  const percentageLoss = ((initialWeight - finalWeight) / initialWeight) * 100;
  return Number(percentageLoss.toFixed(2));
};

// Stock Procurement Calculator
export const calculateReorderPoint = (
  averageDailyUsage: number,
  leadTime: number,
  safetyStock: number
): number => {
  return Math.ceil(averageDailyUsage * leadTime + safetyStock);
};

export const calculateEconomicOrderQuantity = (
  annualDemand: number,
  orderCost: number,
  holdingCost: number
): number => {
  if (holdingCost === 0) return 0;
  return Math.ceil(Math.sqrt((2 * annualDemand * orderCost) / holdingCost));
};

// Dosage Calculator
export const calculateDosage = (
  stockStrength: number,
  prescribedDose: number,
  volume: number
): number => {
  if (stockStrength === 0) return 0;
  return Number(((prescribedDose / stockStrength) * volume).toFixed(2));
};

// Format currency
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

// Format percentage
export const formatPercentage = (value: number): string => {
  return `${value.toFixed(2)}%`;
};

// Format decimal
export const formatDecimal = (value: number, decimals: number = 2): string => {
  return value.toFixed(decimals);
};
