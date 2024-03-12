export default function RowSection({
    header,
    restaurants,
  }: {
    header: string;
    restaurants: Restaurant[];
  }) {
    return (
      <div className="p-4">
        <div className="text-3xl font-semibold text-primary">{header}</div>
        <div className="flex flex-row -mx-2 overflow-x-auto">
          {restaurants.map((restaurant) => (
            <div className="m-2 p-2 flex flex-col border rounded-md shadow-md min-h-64 min-w-40" key={restaurant.id}>
              <img
                src={restaurant.picture}
                className="w-full h-32 object-cover rounded-md"
              ></img>
              <div className="text-left mb-2">
                <div className="text-lg font-medium">{restaurant.name}</div>
                <div className="text-sm">{restaurant.cuisine}</div>
                <div className="text-sm">{restaurant.street}</div>
              </div>
              <div className="text-center mt-auto">
                <div className="text-2xl font-medium text-primary">
                  {restaurant.discount}% off
                </div>
                <div className="">
                  {restaurant.closingtime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }