import Link from "next/link";

export default function Navbar() {
  return (
    <div className="text-white py-5 flex justify-between items-center px-10 font-semibold">
      <div className="text-xl font-bold">SaveAnimals.org</div>
      <div className="flex gap-8 items-center">
        <Link className="hover:text-slate-500 duration-300" href={"/"}>
          Home
        </Link>
        <Link className="hover:text-slate-500 duration-300" href={"/login"}>
          Login
        </Link>
        <Link className="hover:text-slate-500 duration-300" href={"/register"}>
          Register
        </Link>
      </div>
    </div>
  );
}
