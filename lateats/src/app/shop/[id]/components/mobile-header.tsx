export default function MobileHeader({
    name,
    cuisine,
    street,
  }: {
    name: string;
    cuisine: string;
    street: string;
}) {
    return (
      <div className="h-auto bg-primary p-4">
        <div className="flex-col">
          <div className="font-bold text-4xl text-white mb-1 font-serif">
            {name}
          </div>
          <div className="font-light text-xl text-white mb-2">
            {cuisine}
          </div>
          <div className="font-medium text-lg text-white">
            {street}
          </div>
        </div>
      </div>
    );
  }
  