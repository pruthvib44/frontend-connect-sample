
import { useForm } from "react-hook-form";
import type { UserI } from "../types/UserI";
import { useContext, useEffect } from "react";
import { LoginContextObj } from "../contexts/LoginContext";
import type { UserCredI } from "../types/UserCredI";
import { useNavigate } from "react-router-dom";


function Login() {
  const { register, handleSubmit } = useForm<UserI>();
  const { userLogin,loginStatus } = useContext(LoginContextObj);
  const navigate = useNavigate();

  const onLogin = (credObj: UserCredI) => {
    userLogin(credObj);
  };

  useEffect(()=>{
    if(loginStatus === true){
      navigate("/dashboard")
    }
  },[loginStatus])

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
      <h2 style={{ textAlign: "center" }}>Login</h2>
      <form
        onSubmit={handleSubmit(onLogin)}
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
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
