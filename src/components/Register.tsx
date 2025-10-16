import React from "react";
import { useForm } from "react-hook-form";
import type { UserI } from "../types/UserI";
import { useNavigate } from "react-router-dom";

function Register() {
  const { register, handleSubmit } = useForm<UserI>();
  const navigate = useNavigate();
  const onSubmit = async (data: UserI) => {
    // console.log(data);
    // Make API Request
    const res = await fetch("http://localhost:3000/user-api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.status === 201) {
      navigate("/login");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Register</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        {/* Name */}
        <input
          {...register("name", { required: "Name is required" })}
          placeholder="Enter your name"
        />

        {/* Password */}
        <input
          type="password"
          {...register("password", { required: "Password is required" })}
          placeholder="Enter your password"
        />

        {/* Age */}
        <input
          type="number"
          {...register("age", { required: "Age is required" })}
          placeholder="Enter your age"
        />

        {/* Email (optional) */}
        <input
          type="email"
          {...register("email")}
          placeholder="Enter your email (optional)"
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
