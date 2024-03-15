import Link from "next/link";

export default function ShopHeader({
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
      <div className="flex flex-col lg:flex-row lg:justify-between">
        <div className="font-bold text-4xl text-white mb-1 font-serif lg:place-self-center">
          {name}
        </div>
        <div className="font-light text-xl text-white mb-2 block lg:hidden">
          {cuisine}
        </div>
        <div className="font-medium text-lg text-white block lg:hidden">
          {street}
        </div>
        <div className="hidden lg:block text-center mt-3">
          <div className="font-light text-lg text-white leading-5">
            Discounted food for you
            <br />
            Zero leftovers for f&b owners
          </div>
        </div>
        <div className="hidden lg:flex">
          <div className="p-4 text-2xl font-semibold text-primary bg-white rounded-lg drop-shadow-md mr-4">
            Logout
          </div>
          <Link
            href={"/"}
            className="p-4 text-2xl font-semibold text-primary bg-white rounded-lg drop-shadow-md hover:bg-gray-100 transition-all duration-200"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}
