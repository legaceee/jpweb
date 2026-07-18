/**
 * JP ENTERPRISES PRICING CONFIGURATION
 * =====================================
 * Rates are per sq. ft. in INR (₹) for indicative cost estimations.
 * Update these rate bands as pricing or material costs change.
 */

export interface RateBand {
  label: string;
  description: string;
  interiorPerSqFt: { min: number; max: number };
  civilPerSqFt: { min: number; max: number };
  bothPerSqFt: { min: number; max: number };
}

export const PRICING_CONFIG: Record<string, RateBand> = {
  essential: {
    label: "Essential",
    description: "Durable, high-quality standard laminates, branded fittings, and clean execution.",
    interiorPerSqFt: { min: 1200, max: 1600 },
    civilPerSqFt: { min: 800, max: 1100 },
    bothPerSqFt: { min: 1800, max: 2400 },
  },
  premium: {
    label: "Premium",
    description: "Veneer & acrylic cabinetry finishes, quartz countertops, ambient lighting layers.",
    interiorPerSqFt: { min: 1800, max: 2500 },
    civilPerSqFt: { min: 1200, max: 1600 },
    bothPerSqFt: { min: 2700, max: 3700 },
  },
  luxury: {
    label: "Luxury",
    description: "Italian marble flooring, PU lacquer wood finishes, customized architectural elements.",
    interiorPerSqFt: { min: 2800, max: 4200 },
    civilPerSqFt: { min: 1800, max: 2600 },
    bothPerSqFt: { min: 4200, max: 6200 },
  },
};

export const SPACE_TYPES = [
  { id: "1bhk", label: "1 BHK Flat", avgSqFt: 550 },
  { id: "2bhk", label: "2 BHK Flat", avgSqFt: 850 },
  { id: "3bhk", label: "3 BHK Flat", avgSqFt: 1300 },
  { id: "villa", label: "Bungalow / Villa", avgSqFt: 2400 },
  { id: "room", label: "Single Room / Kitchen", avgSqFt: 300 },
  { id: "office", label: "Commercial Office", avgSqFt: 1000 },
];
