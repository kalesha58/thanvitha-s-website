import type { BowlOption } from "@/lib/types";

export const bowlBases: BowlOption[] = [
  { id: "jeera", name: "Jeera Rice", price: 69, protein: 2, calories: 180, note: "Fragrant & flavourful" },
  { id: "sweet-potato", name: "Roasted sweet potato", price: 79, protein: 2, calories: 190, note: "Slow-roasted" },
  { id: "greens", name: "Mixed greens", price: 65, protein: 3, calories: 90, note: "Crisp and bright" },
];

export const bowlProteins: BowlOption[] = [
  { id: "chicken", name: "Grilled Chicken", price: 139, protein: 29, calories: 220, note: "Grilled, never fried" },
  { id: "paneer", name: "Paneer Tikka", price: 119, protein: 22, calories: 210, note: "Tandoori-spiced & golden" },
  { id: "tofu", name: "Crispy Tofu", price: 119, protein: 19, calories: 210, note: "Plant-powered crunch" },
];

export const bowlSauces: BowlOption[] = [
  { id: "mint-yogurt", name: "Mint Yogurt", price: 0, protein: 2, calories: 40, note: "Cool and refreshing" },
  { id: "peri-peri", name: "Peri-Peri Yogurt", price: 0, protein: 2, calories: 55, note: "Spicy & tangy" },
  { id: "lemon-yogurt", name: "Lemon Yogurt", price: 0, protein: 2, calories: 55, note: "Cool and tangy" },
];

export const bowlExtras: BowlOption[] = [
  { id: "none", name: "No extra", price: 0, protein: 0, calories: 0, note: "Keep it classic" },
  { id: "egg", name: "Boiled Egg", price: 25, protein: 6, calories: 75, note: "Extra protein boost" },
];
