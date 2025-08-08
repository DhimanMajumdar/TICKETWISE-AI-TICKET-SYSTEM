import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckAuth = ({ children, protectedRoute = false }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (protectedRoute) {
      // Protected route: must have token
      if (!token) {
        navigate("/login", { replace: true });
      } else {
        setLoading(false);
      }
    } else {
      // Public route (login/signup): redirect to home if already logged in
      if (token) {
        navigate("/", { replace: true });
      } else {
        setLoading(false);
      }
    }
    // we only want to run this on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return <>{children}</>;
};

export default CheckAuth;
