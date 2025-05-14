import { useEffect, useState } from "react";
import { fetchCurrentUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: Readonly<Props>) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetchCurrentUser();
        if(res?.userId) {
          localStorage.setItem("userId", res.userId);
        }
        setLoading(false); // Authenticated
        // navigate("/"); // Redirect to home
      } catch {
        setLoading(false)
        navigate("/login"); // Redirect to login
      }
    };
    checkAuth();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen w-[100vw] flex items-center justify-center">
        <p className="text-gray-600 text-lg">Checking session...</p>
      </div>
    );
  }

  return <>{children}</>;
}
