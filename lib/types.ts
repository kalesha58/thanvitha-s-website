export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  protein: number;
  calories: number;
  carbs: number;
  fat: number;
  fiber?: number;
  description: string;
  ingredients?: string[];
  image: string;
  tag?: string;
  color: string;
  day?: string;
  isVeg?: boolean;
  portionInfo?: string;
};

export type CartItem = Product & {
  quantity: number;
  portion: string;
  addOn?: string;
};

export type BowlOption = {
  id: string;
  name: string;
  price: number;
  protein: number;
  calories: number;
  note: string;
};
