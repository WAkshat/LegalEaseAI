import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";

export default function Login() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.email && loginForm.password) {
      login();
      setLoginForm({ email: "", password: "" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-md mx-auto w-full">
        <div className="bg-white rounded-[32px] p-10 shadow-[0_20px_80px_rgba(0,0,0,0.08)] border border-[#E5E7EB]">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-gradient-to-br from-[#6366F1] to-[#4ADE80] rounded-[20px] flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-[#1F2937] mb-2">
              Welcome Back
            </h1>
            <p className="text-[#6B7280]">
              Sign in to continue analyzing legal documents
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-[#374151] mb-3">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                value={loginForm.email}
                onChange={handleInputChange}
                className="w-full px-4 py-4 rounded-[18px] border border-[#D1D5DB] focus:border-[#6366F1] focus:outline-none transition-colors text-[#1F2937]"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#374151] mb-3">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                value={loginForm.password}
                onChange={handleInputChange}
                className="w-full px-4 py-4 rounded-[18px] border border-[#D1D5DB] focus:border-[#6366F1] focus:outline-none transition-colors text-[#1F2937]"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#6366F1] text-white py-4 rounded-[18px] font-semibold shadow-[0_4px_20px_rgba(99,102,241,0.3)] transition-all hover:shadow-[0_6px_25px_rgba(99,102,241,0.4)]"
            >
              Sign In
            </button>
          </form>

          <div className="text-center mt-8">
            <p className="text-[#6B7280]">
              <span>Don't have an account? </span>
              <button
                onClick={() => navigate("/signup")}
                className="text-[#6366F1] font-semibold hover:underline"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
