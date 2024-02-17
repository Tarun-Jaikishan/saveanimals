"use client";

import { setOffLoading, setOnLoading } from "@/app/(features)/loadingSlice";
import { api_url } from "@/app/common";
import Button from "@/components/common/Button";
import TextArea from "@/components/common/TextArea";
import TextField from "@/components/common/TextField";
import axiosConfig from "@/config/axios.config";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function page() {
  const dispatch = useDispatch();

  const initialState = {
    name: "",
    animal: "",
    breed: "",
    photo_link: "ok",
    location: {
      city: "",
      state: "",
    },
    description: "",
    otherDetails: "",
  };
  const [form, setForm] = useState(initialState);

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(setOnLoading());
    try {
      const response = await axiosConfig.post(`${api_url}/user/lost`, form);
      if (response.status === 200) {
        toast.success(response.data.message);
        setForm(initialState);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.error);
    }
    dispatch(setOffLoading());
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div className="mx-5 px-10 py-5 bg-white rounded">
      <h1 className="text-2xl font-semibold">Raise Pet Lost Request</h1>
      <form className="mt-5 space-y-3" onSubmit={handleSubmit}>
        <div>
          <h5>Name</h5>
          <TextField
            placeholder="Enter Name"
            onChange={handleChange}
            value={form.name}
            name={"name"}
          />
        </div>
        <div>
          <h5>Animal</h5>
          <TextField
            placeholder="Enter Animal"
            onChange={handleChange}
            value={form.animal}
            name={"animal"}
            required
          />
        </div>
        <div>
          <h5>Breed</h5>
          <TextField
            placeholder="Enter Breed"
            onChange={handleChange}
            value={form.breed}
            name={"breed"}
          />
        </div>
        <div>
          <h5>City</h5>
          <TextField
            placeholder="Enter City"
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                location: { ...prev.location, city: e.target.value },
              }))
            }
            value={form.location.city}
            name={"city"}
            required
          />
        </div>
        <div>
          <h5>State</h5>
          <TextField
            placeholder="Enter State"
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                location: { ...prev.location, state: e.target.value },
              }))
            }
            value={form.location.state}
            name={"state"}
            required
          />
        </div>

        <div>
          <h5>Has Collar Tag?</h5>
          <div className="flex gap-3 items-center">
            <div className="flex items-center gap-2">
              <label>Yes</label>
              <input
                type="radio"
                name="hasTag"
                onChange={handleChange}
                value={true}
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <label>No</label>
              <input
                type="radio"
                name="hasTag"
                onChange={handleChange}
                value={false}
                required
              />
            </div>
          </div>
        </div>

        <div>
          <h5>Description</h5>
          <TextArea
            placeholder="Enter Description"
            onChange={handleChange}
            value={form.description}
            name={"description"}
            required
          />
        </div>

        <div>
          <h5>Other Details</h5>
          <TextArea
            placeholder="Enter Other Details"
            onChange={handleChange}
            value={form.otherDetails}
            name={"otherDetails"}
          />
        </div>

        <Button
          buttonType="submit"
          name={"Raise Lost Pet"}
          customStyle={"mt-3"}
        />
      </form>
    </div>
  );
}
