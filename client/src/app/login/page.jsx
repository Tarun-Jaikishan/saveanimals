"use client";

import { useState } from "react";

import axios from "axios";
import TextField from "@/components/common/TextField";
import Button from "@/components/common/Button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setOffLoading, setOnLoading } from "../(features)/loadingSlice";

export default function page() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(setOnLoading());
    try {
      const response = await axios.post("http://localhost:3000/api/auth", form);
      if (response.status === 200) {
        sessionStorage.setItem("access_token", response.data.token);
        router.push("/dashboard");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.error);
    }
    dispatch(setOffLoading());
  }

  return (
    <div className="flex justify-center items-center mt-32">
      <div className="px-10 py-5 shadow bg-white rounded">
        <h3 className="text-center text-3xl font-semibold">Login</h3>

        <form className="mt-5" onSubmit={handleSubmit}>
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
            name={"Sign In"}
            customStyle={"mt-3 w-full"}
          />
          <div className="mt-2 flex justify-end">
            <button type="button" className="text-sm">
              Forgot Password?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
