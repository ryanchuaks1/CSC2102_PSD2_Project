export default function ItemGrid({
  item,
  discount,
}: {
  item: FoodItem;
  discount: number;
}) {
  return (
    <div key={item.id} className="m-2 shadow-md border rounded-md">
      <div className="pb-2">
        <img src={item.image} className="w-full aspect-square rounded-t-md" />
        <div className="text-center font-semibold mt-2">{item.name}</div>
        <div className="flex justify-center">
          <div className="text-center line-through">${item.price}</div>
          <div className="text-center font-semibold text-primary ml-1">
            ${(item.price - item.price * (discount / 100)).toPrecision(3)}
          </div>
        </div>
      </div>
    </div>
  );
}
