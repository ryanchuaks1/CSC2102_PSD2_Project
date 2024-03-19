export default function ShopInfo({ restaurant }: { restaurant: Restaurant }) {
  return (
    <div className="lg:flex lg:p-6 lg:justify-between">
      <div className="hidden lg:block bg-primary p-4 rounded-md shadow-md">
        <div className="font-bold text-3xl text-white font-serif">
          {restaurant.name}
        </div>
        <div className="font-light text-lg text-white mb-1">
          {restaurant.cuisine}
        </div>
        <div className="font-medium text-lg text-white">
          {restaurant.street}
        </div>
      </div>

      <div className="">
        <div className="text-center text-primary text-2xl font-semibold pt-4">
          Discounted Items
        </div>
        <div className="text-center font-medium">
          Closes:{" "}
          {restaurant.closingtime}
        </div>
        <div className="text-center font-medium">
          <span className="text-primary font-bold">{restaurant.discount}%</span>{" "}
          off starts at:{" "}
          {restaurant.discounttime}
        </div>
      </div>
      {/* edit shop button */}
      <div className="hidden lg:flex">
        <button className="p-4 text-2xl h-fit self-center font-semibold bg-primary text-white rounded-lg drop-shadow-md hover:bg-slate-50 hover:text-primary hover:border">
          Edit Shop
        </button>
      </div>
    </div>
  );
}
