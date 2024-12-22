export interface IAddress {
  city: string;
  country: string;
  name: {
    first: string;
    last: string;
  };
  phone: string;
  postalCode?: string;
  region: string;
}
