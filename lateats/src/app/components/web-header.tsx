import Link from "next/link";

export default function WebHeader() {
  return (
    <div className="h-28 bg-primary px-6 py-8 flex justify-between">
      <div className="font-bold font-serif text-4xl text-white pb-1">
        Lateats Web
      </div>
      <div className="font-extralight text-xl text-white leading-6 text-center">
        Discounted food for you
        <br />
        Zero leftovers for f&b owners
      </div>
      <div className="self-center">
        <Link
          href={"/login"}
          className="bg-white text-primary font-semibold px-4 py-2 rounded-md text-xl"
        >
          Stall Login
        </Link>
      </div>
    </div>
  );
}
