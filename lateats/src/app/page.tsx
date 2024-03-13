import ListSection from "./components/list-section";
import MobileFooter from "./components/mobile-footer";
import MobileHeader from "./components/mobile-header";
import RowSection from "./components/row-section";
import SearchBar from "./components/searchbar";
import WebHeader from "./components/web-header";
import Map from "./map/page";

export default function Home() {
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
        <div className="lg:max-w-96 lg:overflow-y-scroll lg:h-[88vh] -mt-7 pt-7">
          <ListSection header="Near you" restaurants={sampleRestaurants} />
          <ListSection header="Popular" restaurants={sampleRestaurants} />
          <RowSection header="Highest Rated" restaurants={sampleRestaurants} />
        </div>
        <div className="flex-grow hidden lg:block -mt-7">
          <Map restaurants={sampleRestaurants} />
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
    longitude: 103.827432,
    latitude: 1.359817,
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
    longitude: 103.822345,
    latitude: 1.364219,
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
    longitude: 103.817123,
    latitude: 1.349632,
    cuisine: "Japanese",
    closingtime: new Date("2024-03-11T20:45:00"),
    discount: 12,
    rating: 4.7,
    picture: "https://picsum.photos/200/300",
  },
  {
    id: 4,
    name: "Burger Bliss",
    street: "321 Maple Lane",
    longitude: 103.832567,
    latitude: 1.369481,
    cuisine: "American",
    closingtime: new Date("2024-03-11T21:00:00"),
    discount: 8,
    rating: 4.0,
    picture: "https://picsum.photos/200/300",
  },
  {
    id: 5,
    name: "Mango Tango",
    street: "555 Pine Street",
    longitude: 103.81789,
    latitude: 1.355782,
    cuisine: "Asian Fusion",
    closingtime: new Date("2024-03-11T22:30:00"),
    discount: 18,
    rating: 4.8,
    picture: "https://picsum.photos/200/300",
  },
  {
    id: 6,
    name: "Taco Delight",
    street: "876 Cedar Avenue",
    longitude: 103.842123,
    latitude: 1.362943,
    cuisine: "Mexican",
    closingtime: new Date("2024-03-11T20:15:00"),
    discount: 14,
    rating: 4.4,
    picture: "https://picsum.photos/200/300",
  },
  {
    id: 7,
    name: "Noodle House",
    street: "999 Oak Lane",
    longitude: 103.808765,
    latitude: 1.340219,
    cuisine: "Chinese",
    closingtime: new Date("2024-03-11T21:45:00"),
    discount: 12,
    rating: 4.6,
    picture: "https://picsum.photos/200/300",
  },
  {
    id: 8,
    name: "Greek Delight",
    street: "654 Birch Road",
    longitude: 103.85321,
    latitude: 1.375632,
    cuisine: "Greek",
    closingtime: new Date("2024-03-11T19:30:00"),
    discount: 16,
    rating: 4.3,
    picture: "https://picsum.photos/200/300",
  },
  {
    id: 9,
    name: "Fusion Bites",
    street: "789 Pine Lane",
    longitude: 103.825678,
    latitude: 1.351234,
    cuisine: "International",
    closingtime: new Date("2024-03-11T22:15:00"),
    discount: 20,
    rating: 4.9,
    picture: "https://picsum.photos/200/300",
  },
];
