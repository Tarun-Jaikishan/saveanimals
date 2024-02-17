"use client";

import image from "@/assets/dog.jpg";
import Image from "next/image";

import { IoIosWarning } from "react-icons/io";
import { GiBlackBelt } from "react-icons/gi";

import DialogBox from "../common/DialogBox";
import { useState } from "react";
import { api_url } from "@/app/common";
import { toast } from "react-toastify";
import axiosConfig from "@/config/axios.config";

export default function Card({ item, setData }) {
  const [open, setOpen] = useState(false);

  async function setMislead(id) {
    try {
      const response = await axiosConfig.put(`${api_url}/user/lost`, { id });
      if (response.status === 200) toast.success(response.data.message);
    } catch (err) {
      toast.error(err.response.data.error);
      console.log(err);
    }
  }

  async function deleteLost(id) {
    try {
      const response = await axiosConfig.delete(`${api_url}/user/lost`, {
        params: { id },
      });
      if (response.status === 200) {
        setData((prev) => {
          let data = prev.filter((item) => item._id !== id);
          return data;
        });
      }
    } catch (err) {
      toast.error(err.response.data.error);
      console.log(err);
    }
  }

  return (
    <div>
      <div className="border-2 w-[18rem]">
        <button onClick={() => setOpen(true)}>
          <Image width={300} src={image} alt="Image" />
        </button>
        <div className="p-2">
          {item.name && <h3 className="font-bold">{item.name}</h3>}
          <h3 className="text-sm italic">
            {item.animal} {item.breed && <span>/ {item.breed}</span>}
          </h3>
          <h3 className="text-sm italic">
            {item.location.city}, {item.location.state}
          </h3>
          <br />
          <p className="text-sm">{item.description}</p>
          <p className="mt-2 text-sm">{item.otherDetails}</p>

          {item.hasTag && (
            <div className="mt-2 flex justify-center items-center">
              <GiBlackBelt className="text-4xl" />
            </div>
          )}
        </div>
        {item.userInfo && (
          <div className="flex justify-between items-center px-4 pb-2 text-red-600">
            <button
              onClick={() => setMislead(item._id)}
              className="flex justify-between text-sm"
            >
              <div className="flex gap-2 items-center ">
                <IoIosWarning /> Misleading
              </div>
            </button>
            {item.misleading !== 0 && (
              <div className="text-sm">{item.misleading}</div>
            )}
          </div>
        )}

        <p className="text-[0.5rem] px-4 pb-2 text-end">
          {new Date(item.createdAt).toLocaleDateString("en-US", {
            timeZone: "Asia/Kolkata",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </p>

        {!item.userInfo && (
          <div className="my-2 flex justify-center items-center text-sm">
            <button
              onClick={() => deleteLost(item._id)}
              className="text-red-600 font-semibold"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {item.userInfo && (
        <DialogBox open={open} setOpen={setOpen}>
          <h3 className="text-xl font-bold">Owner Info</h3>
          <hr className="my-3" />

          <div className="flex items-center gap-3">
            Username: <span>{item.userInfo.username}</span>
          </div>
          <div className="flex items-center gap-3">
            Name: <span>{item.userInfo.name}</span>
          </div>

          <div className="flex items-center gap-3">
            Address: <span>{item.userInfo.address}</span>
          </div>
          <div className="flex items-center gap-3">
            Phone: <span>{item.userInfo.phone}</span>
          </div>
          <div className="flex items-center gap-3">
            Gender: <span>{item.userInfo.gender}</span>
          </div>
          <div className="flex items-center gap-3">
            Email: <span>{item.userInfo.email}</span>
          </div>
        </DialogBox>
      )}
    </div>
  );
}
