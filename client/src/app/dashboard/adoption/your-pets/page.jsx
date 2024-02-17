"use client";

import { setOffLoading, setOnLoading } from "@/app/(features)/loadingSlice";
import { api_url } from "@/app/common";
import Card from "@/components/adoption/Card";
import axiosConfig from "@/config/axios.config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";

export default function page() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  async function getData() {
    dispatch(setOnLoading());
    try {
      const response = await axiosConfig.get(`${api_url}/user/adopt`);
      console.log(response.data);
      if (response.status === 200) setData(response.data);
    } catch (err) {
      console.log(err);
    }
    dispatch(setOffLoading());
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="mx-5 px-10 py-3 bg-white rounded">
      <div className="flex justify-end">
        <button
          onClick={() => router.push("/dashboard/adoption/add")}
          className="flex items-center gap-3 px-10 bg-orange-600 rounded-lg py-2 text-white hover:bg-orange-800 duration-300 font-semibold"
        >
          <FaPlus />
          Add Adoption
        </button>
      </div>

      <div className="mt-10">
        {data.length === 0 && (
          <div className="text-center italic">No Active Adoptions</div>
        )}
        {data.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center justify-center">
            {data.map((item, i) => {
              return <Card key={i} item={item} setData={setData} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
