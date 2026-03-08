import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";

export default function Login() {
  const { session, signIn } = useAuth();
  const navigate = useNavigate();

  if (session) return <Navigate to="/" replace />;
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const { error: authError } = await signIn(email, password);

    if (authError) {
      setError(authError.message);
    } else {
      navigate("/", { replace: true });
    }
  };

  return (
    <AuthForm
      title="Login"
      submitLabel="Login"
      onSubmit={handleLogin}
      message={error}
      messageType="error"
      linkTo="/signup"
      linkLabel="Sign up"
      linkPrompt="Don't have an account?"
    />
  );
}
