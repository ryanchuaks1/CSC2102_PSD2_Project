import Image from "next/image";

export default function Login() {
  return (
    <div className="flex flex-col px-6 py-12 min-h-screen bg-white">
      <div className="text-primary text-4xl font-bold font-serif text-center">
        Lateats
      </div>
      <div className="text-slate-950 text-lg text-center p-1">
        Discounted supper near 🫵
      </div>
      <Image
        src="/supper.svg"
        width={500}
        height={500}
        alt="Picture of peopple eating supper"
        className="p-8"
      />
      <input
        type="email"
        placeholder="Email"
        className="border-b-2 border-primary p-2 m-2"
      ></input>
      <input
        type="password"
        placeholder="Password"
        className="border-b-2 border-primary p-2 m-2"
      ></input>
      <button className="bg-primary text-white p-2 m-2 rounded-lg">
        Login
      </button>
    </div>
  );
}
