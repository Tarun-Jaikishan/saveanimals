"use client";

import { useState } from "react";

import axios from "axios";
import TextField from "@/components/common/TextField";
import Button from "@/components/common/Button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import TextArea from "@/components/common/TextArea";
import { useDispatch } from "react-redux";
import { setOffLoading, setOnLoading } from "../(features)/loadingSlice";

export default function page() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    username: "",
    name: "",
    address: "",
    phone: "",
    gender: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(setOnLoading());
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        form
      );
      if (response.status === 200) toast.success(response.data.message);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.error);
    }
    dispatch(setOffLoading());
  }

  return (
    <div className="flex justify-center items-center my-10">
      <div className="px-10 py-5 shadow bg-white rounded">
        <h3 className="text-center text-3xl font-semibold">Register</h3>

        <form className="mt-5 space-y-3" onSubmit={handleSubmit}>
          <div>
            <h5>Username</h5>
            <TextField
              placeholder="Enter Username"
              onChange={handleChange}
              value={form.username}
              name={"username"}
              required
            />
          </div>
          <div>
            <h5>Name</h5>
            <TextField
              placeholder="Enter Name"
              onChange={handleChange}
              value={form.name}
              name={"name"}
              required
            />
          </div>
          <div>
            <h5>Address</h5>
            <TextArea
              customStyle={"w-full"}
              placeholder="Enter Address"
              onChange={handleChange}
              value={form.address}
              name={"address"}
              required
            />
          </div>
          <div>
            <h5>Phone Number</h5>
            <TextField
              placeholder="Enter Phone Number"
              type="number"
              onChange={handleChange}
              value={form.phone}
              name={"phone"}
              required
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
            <h5>Email</h5>
            <TextField
              placeholder="Enter Email"
              type="email"
              onChange={handleChange}
              value={form.email}
              name={"email"}
              required
            />
          </div>
          <div className="mt-3">
            <h5>Password</h5>
            <TextField
              placeholder="Enter Password"
              type="password"
              onChange={handleChange}
              value={form.password}
              name={"password"}
              required
            />
          </div>

          <Button
            buttonType="submit"
            name={"Register"}
            customStyle={"mt-3 w-full"}
          />
        </form>
      </div>
    </div>
  );
}
