'use client'

export default function MobileFooter() {
  const openMap = () => {
    const map = document.getElementById("map");
    if (map) {
      map.classList.toggle("hidden");
    }
  };

  return (
    <div className="h-24 bg-white p-4 flex justify-between shadow-inner shaodw-lg">
      <button className="p-4 text-2xl font-semibold text-white bg-primary rounded-lg drop-shadow-md">
        Stall Login
      </button>
      <button
        onClick={openMap}
        className="p-4 text-2xl font-semibold text-white bg-primary rounded-lg drop-shadow-md flex-auto ml-4 text-center"
      >
        View Map
      </button>
    </div>
  );
}
