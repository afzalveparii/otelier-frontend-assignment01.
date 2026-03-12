import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";

export default function Signup() {
  const { session, signUp } = useAuth();
  const navigate = useNavigate();

  if (session) return <Navigate to="/" replace />;
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const fullName = formData.get("fullName");
    const gender = formData.get("gender");
    const dateofbirth = formData.get("dateofbirth");
    const age = formData.get("age");

    const { error: authError } = await signUp(email, password, { fullName, gender, age, dateofbirth });

    if (authError) {
      setMessage(authError.message);
      setIsError(true);
    } else {
      setMessage("Signup successful! Please check your email to confirm.");
      setIsError(false);
      setTimeout(() => navigate("/login", { replace: true }), 2000);
    }
  };

  return (
    <AuthForm
      title="Sign up"
      submitLabel="Create account"
      onSubmit={handleSignup}
      message={message}
      messageType={isError ? "error" : "success"}
      linkTo="/login"
      linkLabel="Login"
      linkPrompt="Already have an account?"
      isSignup={true}
    />
  );
}
