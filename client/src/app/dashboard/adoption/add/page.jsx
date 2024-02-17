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
    years: "",
    months: "",
    days: "",
    gender: "",
    animal: "",
    breed: "",
    photo_link: "ok",
    isVaccinated: null,
    description: "",
    location: {
      city: "",
      state: "",
    },
  };
  const [form, setForm] = useState(initialState);

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(setOnLoading());

    console.log(form);
    try {
      const response = await axiosConfig.post(`${api_url}/user/adopt`, {
        ...form,
        age: `${form.years}-${form.months}-${form.days}`,
      });
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
      <h1 className="text-2xl font-semibold">Raise Adoption</h1>
      <form className="mt-5 space-y-3" onSubmit={handleSubmit}>
        <div className="flex gap-5 items-center">
          <div>
            <h5>Years</h5>
            <TextField
              placeholder="Enter Years"
              onChange={handleChange}
              value={form.name}
              name={"years"}
              required
            />
          </div>
          <div>
            <h5>Months</h5>
            <TextField
              placeholder="Enter Months"
              onChange={handleChange}
              value={form.name}
              name={"months"}
              required
            />
          </div>
          <div>
            <h5>Days</h5>
            <TextField
              placeholder="Enter Days"
              onChange={handleChange}
              value={form.name}
              name={"days"}
              required
            />
          </div>
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
          <h5>Gender</h5>
          <div className="flex gap-3 items-center">
            <div className="flex items-center gap-2">
              <label>Male</label>
              <input
                type="radio"
                name="gender"
                onChange={handleChange}
                value={"male"}
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <label>Female</label>
              <input
                type="radio"
                name="gender"
                onChange={handleChange}
                value={"female"}
                required
              />
            </div>
          </div>
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
          <h5>Is Vaccinated?</h5>
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

        <Button
          buttonType="submit"
          name={"Raise Lost Pet"}
          customStyle={"mt-3"}
        />
      </form>
    </div>
  );
}
