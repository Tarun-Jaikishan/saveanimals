"use client";

import { useLayoutEffect } from "react";
import { ProtectedRoute } from "../ProtectedRoute";

import { FaPaw } from "react-icons/fa6";
import { BsFillPostcardHeartFill } from "react-icons/bs";
import { FaHandHoldingHeart } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();

  useLayoutEffect(() => {
    ProtectedRoute();
  }, []);

  return (
    <div className="mx-5 px-10 py-3 bg-white rounded">
      <div className="flex gap-10 justify-center ">
        <button
          onClick={() => router.push("/dashboard/lost")}
          className="flex flex-col gap-2 items-center p-20  bg-red-600 text-white rounded-lg hover:bg-red-800 duration-300 font-semibold text-4xl justify-center"
        >
          <FaPaw />
          <span>Lost Pets</span>
        </button>
        <button
          onClick={() => router.push("/dashboard/adoption")}
          className="flex flex-col gap-2 items-center p-20  bg-green-600 text-white rounded-lg hover:bg-green-800 duration-300 font-semibold text-4xl justify-center"
        >
          <FaHandHoldingHeart /> Adoptions
        </button>
        <button
          onClick={() => router.push("/dashboard/posts")}
          className="flex flex-col gap-2 items-center p-20  bg-orange-600 text-white rounded-lg hover:bg-orange-800 duration-300 font-semibold text-4xl justify-center"
        >
          <BsFillPostcardHeartFill /> Create Posts
        </button>
      </div>

      {/* <div className="mt-5">s</div> */}
    </div>
  );
}
