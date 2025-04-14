import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../api";
import toast from "react-hot-toast";

const OAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("token", token);

      API.get("/users/me")
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data));
          toast.success("Logged in with Google ✅");
          navigate("/");
        })
        .catch((err) => {
          toast.error("Login failed: couldn't fetch user info");
          console.error("Error fetching user:", err);
          navigate("/login");
        });
    } else {
      toast.error("No token found in redirect");
      navigate("/login");
    }
  }, []);

  return <div>Redirecting...</div>;
};

export default OAuthSuccess;
