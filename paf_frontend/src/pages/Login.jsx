import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TEInput, TERipple } from "tw-elements-react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import loginBg from "../images/log.jpg"; 


const Login = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("http://localhost:8080/users/login", {
        email: data.email,
        password: data.password,
      });

      const { token, user } = response.data;

      if (token && user) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error("Login failed: Token or user not received.");
      }
    } catch (error) {
      const errData = error?.response?.data;
      const message =
        typeof errData === "string"
          ? errData
          : errData?.error || "Something went wrong";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* Background Image Layer */}
      <div
        style={{
          backgroundImage: `url(${loginBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.8,
          zIndex: -1,
        }}
      />

      {/* Login Section */}
      <section className="h-screen">
        <div className="container h-full px-6 py-24">
          <div className="g-6 flex h-full flex-wrap items-center justify-end lg:justify-end">
            <div
              className="w-8/12 md:w-full lg:ml-6 lg:w-5/12 mb-2 mt-4 rounded-lg"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
            >
               {/* SIGN IN Header */}
                <h2 className="text-center text-4xl font-bold text-black my-12">SIGN IN</h2>

              <form
                className="ml-6 mr-6 mt-6 mb-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <TEInput
                  type="email"
                  label="Email address"
                  size="lg"
                  className="mb-1"
                  {...register("email", { required: "Email is required" })}
                  isInvalid={errors.email}
                />
                <p className="mb-6 text-sm text-red-500">
                  {errors.email?.message}
                </p>

                <TEInput
                  type="password"
                  label="Password"
                  size="lg"
                  className="mb-1"
                  {...register("password", { required: "Password is required" })}
                  isInvalid={errors.password}
                />
                <p className="mb-6 text-sm text-red-500">
                  {errors.password?.message}
                </p>
                <Typography
                    variant="body2"
                    color="primary"
                    sx={{ mt: 1, cursor: "pointer", textAlign: "right" }}
                    onClick={() => navigate("/forgot-password")}
                  >
                    Forgot Password?
                  </Typography>
                <TERipple rippleColor="light" className="w-full">
                  <button
                    type="submit"
                    className="mb-3 inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white"
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </button>
                </TERipple>

                <TERipple rippleColor="light" className="w-full">
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="mb-3 inline-block w-full rounded bg-red-600 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white"
                  >
                    Sign in with Google
                  </button>
                </TERipple>

                <TERipple rippleColor="light" className="w-full">
                  <button
                    onClick={() => navigate("/register")}
                    className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white"
                  >
                    Don't have an account? Register
                  </button>
                </TERipple>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
