"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(sessionStorage.getItem("access_token"));
  }, [pathname]);

  const router = useRouter();

  return (
    <div className="text-white py-5 flex justify-between items-center px-10 font-semibold">
      <div className="text-xl font-bold">SaveAnimals.org</div>
      <div className="flex gap-8 items-center">
        <Link className="hover:text-slate-500 duration-300" href={"/"}>
          Home
        </Link>
        {token && (
          <Link
            className="hover:text-slate-500 duration-300"
            href={"/dashboard"}
          >
            Dashboard
          </Link>
        )}

        {token && (
          <button
            onClick={() => {
              sessionStorage.removeItem("access_token");
              router.push("/");
            }}
            className="border-2 border-white text-white rounded px-3 py-1.5  hover:bg-red-600 hover:border-red-600 hover:text-white duration-300"
          >
            Log Out
          </button>
        )}

        {!token && (
          <Link className="hover:text-slate-500 duration-300" href={"/login"}>
            Login
          </Link>
        )}
        {!token && (
          <Link
            className="hover:text-slate-500 duration-300"
            href={"/register"}
          >
            Register
          </Link>
        )}
      </div>
    </div>
  );
}
