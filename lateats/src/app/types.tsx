type Restaurant = {
  _id: string;
  name: string;
  street: string;
  longitude: number;
  latitude: number;
  cuisine: string;
  discounttime: string;
  closingtime: string;
  discount: number;
  rating?: number;
  picture?: string;
};

type FoodItem = {
  _id: number;
  name: string;
  base_price: number;
  image: string;
  isSoldOut: boolean;
};

type Account = {
  id: number;
  email: string;
  password: string;
  restaurantId: number;
};
