"use client";

import { setOffLoading, setOnLoading } from "@/app/(features)/loadingSlice";
import { api_url } from "@/app/common";
import Button from "@/components/common/Button";
import Card from "@/components/lost/Card";
import TextField from "@/components/common/TextField";
import axiosConfig from "@/config/axios.config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { FaPaw, FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";

export default function page() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [search, setSearch] = useState({
    city: "",
    state: "",
  });

  const [data, setData] = useState([]);

  function handleChange(e) {
    setSearch({ ...search, [e.target.name]: e.target.value });
  }

  async function getData() {
    dispatch(setOnLoading());
    try {
      const response = await axiosConfig.get(`${api_url}/user/lost-all`, {
        params: { ...search },
      });
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
      <div className="flex justify-end gap-5">
        <button
          onClick={() => router.push("/dashboard/lost/your-pets")}
          className="flex items-center gap-3 px-10 bg-orange-600 rounded-lg py-2 text-white hover:bg-orange-800 duration-300 font-semibold"
        >
          <FaPaw />
          Your Pets
        </button>
        <button
          onClick={() => router.push("/dashboard/lost/add")}
          className="flex items-center gap-3 px-10 bg-orange-600 rounded-lg py-2 text-white hover:bg-orange-800 duration-300 font-semibold"
        >
          <FaPlus />
          Add Your Lost Pet
        </button>
      </div>

      {/* Filter */}
      <div className="mt-5 flex gap-3 justify-end items-end">
        <TextField
          name={"city"}
          value={search.city}
          onChange={handleChange}
          placeholder="Enter City"
        />
        <TextField
          name={"state"}
          value={search.state}
          onChange={handleChange}
          placeholder="Enter State"
        />

        <Button onClick={getData} name={"Search"} />
      </div>

      <div className="mt-10">
        {data.length === 0 && (
          <div className="text-center italic">No Active Lost Requests</div>
        )}
        {data.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center justify-center">
            {data.map((item, i) => {
              return <Card key={i} item={item} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
