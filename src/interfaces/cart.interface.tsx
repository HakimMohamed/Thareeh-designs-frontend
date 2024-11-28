export interface IFormattedCart {
  _id: string;
  _user: string;
  items: {
    _id: string;
    name: string;
    quantity: number;
    originalPrice: number;
    price: number;
    image: string;
    discount: { active: boolean; value: number };
  }[];
  price: number;
  originalPrice: number;
}
