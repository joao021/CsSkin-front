export interface Item {
  id: string;
  name: string;
  image: string;
  category: string;
  float?: string;
  price: number;
}

export interface Filters {
  name?: string;
  floatMin?: number; 
  floatMax?: number; 
  priceMin?: number; 
  priceMax?: number;  
  category?: string;
  sort?: "price" | "float";
}
