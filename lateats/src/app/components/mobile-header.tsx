export default function MobileHeader() {
  return (
    <div className="h-36 bg-primary p-4 flex justify-between">
      <div className="flex-col">
        <div className="font-bold font-serif text-4xl text-white pb-1">
          Lateats
        </div>
        <div className="font-light text-lg text-white leading-5">
          Discounted food for you
          <br />
          Zero leftovers for f&b owners
        </div>
      </div>
      <div>
        <img src="fryingpan_animated.gif" className="object-contain h-28"></img>
      </div>
    </div>
  );
}
