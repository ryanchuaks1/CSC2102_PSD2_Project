import ListSection from "./components/list-section";
import MobileFooter from "./components/mobile-footer";
import MobileHeader from "./components/mobile-header";
import RowSection from "./components/row-section";
import SearchBar from "./components/searchbar";
import WebHeader from "./components/web-header";
import Map from "./components/map";

export default async function Home() {
  return (
    <div className="bg-white min-h-screen">
      <div className="hidden lg:block">
        <WebHeader />
      </div>
      <div className="lg:hidden">
        <MobileHeader />
      </div>
      <div className="mx-8 -mt-5 lg:max-w-80">
        <SearchBar />
      </div>
      <div className="lg:flex">
        <div
          className="lg:max-w-96 lg:overflow-y-scroll h-screen -mt-7 pt-7"
          style={{ height: "calc(100vh - 7rem)" }}
        >
          <ListSection header="Near you" restaurants={sampleRestaurants} />
          <ListSection header="Popular" restaurants={sampleRestaurants} />
          <RowSection header="Highest Rated" restaurants={sampleRestaurants} />
        </div>
        <div className="flex-grow hidden lg:block -mt-7">
          <Map /> 
        </div>
      </div>
      <div className="sticky bottom-0 w-full lg:hidden">
        <MobileFooter />
      </div>
    </div>
  );
}

const sampleRestaurants = [
  {
    id: 1,
    name: "Food Haven",
    street: "123 Main Street",
    longitude: -73.987432,
    latitude: 40.748817,
    cuisine: "Italian",
    closingtime: new Date("2024-03-11T21:30:00"),
    discount: 10,
    rating: 4.5,
    picture: "https://picsum.photos/200/300",
  },
  {
    id: 2,
    name: "Spice Paradise",
    street: "456 Oak Avenue",
    longitude: -73.982345,
    latitude: 40.754219,
    cuisine: "Indian",
    closingtime: new Date("2024-03-11T22:00:00"),
    discount: 15,
    rating: 4.2,
    picture: "https://picsum.photos/200/300",
  },
  {
    id: 3,
    name: "Sushi Delight",
    street: "789 Elm Road",
    longitude: -73.978123,
    latitude: 40.749632,
    cuisine: "Japanese",
    closingtime: new Date("2024-03-11T20:45:00"),
    discount: 12,
    rating: 4.7,
    picture: "https://picsum.photos/200/300",
  },
  {
    id: 4,
    name: "Food Haven",
    street: "123 Main Street",
    longitude: -73.987432,
    latitude: 40.748817,
    cuisine: "Italian",
    closingtime: new Date("2024-03-11T21:30:00"),
    discount: 10,
    rating: 4.5,
    picture: "https://picsum.photos/200/300",
  },
  {
    id: 5,
    name: "Spice Paradise",
    street: "456 Oak Avenue",
    longitude: -73.982345,
    latitude: 40.754219,
    cuisine: "Indian",
    closingtime: new Date("2024-03-11T22:00:00"),
    discount: 15,
    rating: 4.2,
    picture: "https://picsum.photos/200/300",
  },
  {
    id: 6,
    name: "Sushi Delight",
    street: "789 Elm Road",
    longitude: -73.978123,
    latitude: 40.749632,
    cuisine: "Japanese",
    closingtime: new Date("2024-03-11T20:45:00"),
    discount: 12,
    rating: 4.7,
    picture: "https://picsum.photos/200/300",
  },
  {
    id: 7,
    name: "Food Haven",
    street: "123 Main Street",
    longitude: -73.987432,
    latitude: 40.748817,
    cuisine: "Italian",
    closingtime: new Date("2024-03-11T21:30:00"),
    discount: 10,
    rating: 4.5,
    picture: "https://picsum.photos/200/300",
  },
  {
    id: 8,
    name: "Spice Paradise",
    street: "456 Oak Avenue",
    longitude: -73.982345,
    latitude: 40.754219,
    cuisine: "Indian",
    closingtime: new Date("2024-03-11T22:00:00"),
    discount: 15,
    rating: 4.2,
    picture: "https://picsum.photos/200/300",
  },
  {
    id: 9,
    name: "Sushi Delight",
    street: "789 Elm Road",
    longitude: -73.978123,
    latitude: 40.749632,
    cuisine: "Japanese",
    closingtime: new Date("2024-03-11T20:45:00"),
    discount: 12,
    rating: 4.7,
    picture: "https://picsum.photos/200/300",
  },
  // Add more restaurants as needed
];
