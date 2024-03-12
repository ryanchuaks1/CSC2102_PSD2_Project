export default function MobileFooter() {
  return (
    <div className="h-24 bg-white p-4 flex justify-between shadow-inner shaodw-lg">
      <button className="p-4 text-2xl font-semibold text-white bg-primary rounded-lg drop-shadow-md">
        Stall Login
      </button>
      <button className="p-4 text-2xl font-semibold text-white bg-primary rounded-lg drop-shadow-md flex-auto ml-4">
        View Map
      </button>
    </div>
  );
}
