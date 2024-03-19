type Restaurant = {
  id: number;
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
  id: number;
  name: string;
  price: number;
  image: string;
};

type Account = {
  id: number;
  email: string;
  password: string;
  restaurantId: number;
};
