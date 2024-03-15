export default function ShopInfo(
    {
        closingtime,
        discount,
        discounttime,
    }: {
        closingtime: Date;
        discount: number;
        discounttime: Date;
    }
) {
  return (
    <div>
      <div className="text-center text-primary text-2xl font-semibold pt-4">
        Discounted Items
      </div>
      <div className="text-center font-medium">
        Closes:{" "}
        {closingtime
          .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          .toLocaleLowerCase()}
      </div>
      <div className="text-center font-medium">
        {discount}% off starts at:{" "}
        {discounttime
          .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          .toLocaleLowerCase()}
      </div>
    </div>
  );
}
