export interface Item {
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  discount: {
    active: boolean;
    value: number;
  };
}
