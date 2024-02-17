"use client";

import { api_url } from "@/app/common";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { FaUserCircle } from "react-icons/fa";
import { PiHandsClappingFill } from "react-icons/pi";
import { GiSevenPointedStar } from "react-icons/gi";

import { IoMdMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { setOffLoading, setOnLoading } from "@/app/(features)/loadingSlice";

export default function page() {
  const router = useRouter();

  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    console.log(api_url);
    getUserInfo();
  }, []);

  async function getUserInfo() {
    dispatch(setOnLoading());
    try {
      const response = await axios.get(`${api_url}/public/user-info`, {
        params: {
          username: id,
        },
      });
      if (response.data.length === 0) return router.push("/");

      console.log(response.data);
      setUser(response.data[0]);
    } catch (err) {
      console.log(err);
    }
    dispatch(setOffLoading());
  }

  if (user)
    return (
      <div className="flex justify-around gap-2 mx-5 px-10 py-3 bg-white rounded">
        <div>
          <div className="flex gap-5 items-center">
            <div>
              <FaUserCircle className="text-8xl text-slate-300" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{user.name}</h3>
              <p className="text-sm italic">{user.username}</p>
            </div>
          </div>

          <div className="mt-5 space-y-5">
            <div
              className="flex items-center gap-5 text-xl cursor-pointer"
              title="Email"
            >
              <div className="p-1.5 bg-blue-300 rounded-full">
                <IoMdMail className="text-xl" />
              </div>
              <span className="text-[1rem] font-normal">{user.email}</span>
            </div>

            <div
              className="flex items-center gap-5 text-xl  cursor-pointer"
              title="Phone Number"
            >
              <div className="p-1.5 bg-blue-300 rounded-full">
                <FaPhoneAlt className="text-xl" />
              </div>
              <span className="text-[1rem] font-normal">{user.phone}</span>
            </div>

            <div
              className="flex items-center gap-5 text-xl  cursor-pointer"
              title="Address"
            >
              <div className="p-1.5 bg-blue-300 rounded-full">
                <FaLocationDot className="text-xl" />
              </div>
              <span className="text-[1rem] font-normal">{user.address}</span>
            </div>
          </div>

          <p className="mt-3 text-sm">Member Since, {user.createdAt}</p>
        </div>
        <div className="flex gap-5 justify-center items-center">
          <div className="space-y-5">
            <div
              className="flex items-center gap-5 text-3xl text-green-600 cursor-pointer"
              title="Appreciations"
            >
              <PiHandsClappingFill />{" "}
              <span className="font-bold">{user.appreciations}</span>
            </div>
            <div
              className="flex items-center gap-5 text-3xl text-orange-600 cursor-pointer"
              title="Fair Points"
            >
              <GiSevenPointedStar />{" "}
              <span className="font-bold">{user.fairPoints}</span>
            </div>
          </div>
        </div>
      </div>
    );
}
