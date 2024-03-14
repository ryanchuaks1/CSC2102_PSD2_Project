type Restaurant = {
  id: number;
  name: string;
  street: string;
  longitude: number;
  latitude: number;
  cuisine: string;
  discounttime: Date;
  closingtime: Date;
  discount: number;
  rating?: number;
  picture?: string;
};

type FoodItem = {
  id: number;
  name: string;
  price: number;
  image: string;
};
