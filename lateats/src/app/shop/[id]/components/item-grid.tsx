import Image from "next/image";

export default function ItemGrid({
  item,
  discount,
}: {
  item: FoodItem;
  discount: number;
}) {
  return (
    <div
      key={item._id}
      className="m-2 shadow-md border rounded-md hover:cursor-zoom-in transition hover:scale-150"
    >
      <div className="pb-2">
        <Image
          src={`data:image/jpeg;base64,${item.image}`}
          width={300}
          height={300}
          className="rounded-t-md"
          alt={item.name}
        />
        <div className="text-center font-semibold mt-2">{item.name}</div>
        <div className="flex justify-center">
          <div className="text-center line-through">${item.base_price}</div>
          <div className="text-center font-semibold text-primary ml-1">
            $
            {(item.base_price - item.base_price * (discount / 100)).toPrecision(
              3
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
