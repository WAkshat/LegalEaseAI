import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";

export default function Signup() {
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      signupForm.name &&
      signupForm.email &&
      signupForm.password &&
      signupForm.password === signupForm.confirmPassword
    ) {
      login();
      setSignupForm({ name: "", email: "", password: "", confirmPassword: "" });
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
                <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-[#1F2937] mb-2">
              Create Account
            </h1>
            <p className="text-[#6B7280]">
              Join thousands protecting themselves from legal risks
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-[#374151] mb-3">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                required
                value={signupForm.name}
                onChange={handleInputChange}
                className="w-full px-4 py-4 rounded-[18px] border border-[#D1D5DB] focus:border-[#6366F1] focus:outline-none transition-colors text-[#1F2937]"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#374151] mb-3">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                value={signupForm.email}
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
                value={signupForm.password}
                onChange={handleInputChange}
                className="w-full px-4 py-4 rounded-[18px] border border-[#D1D5DB] focus:border-[#6366F1] focus:outline-none transition-colors text-[#1F2937]"
                placeholder="Create a password"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#374151] mb-3">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                type="password"
                required
                value={signupForm.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-4 rounded-[18px] border border-[#D1D5DB] focus:border-[#6366F1] focus:outline-none transition-colors text-[#1F2937]"
                placeholder="Confirm your password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#6366F1] text-white py-4 rounded-[18px] font-semibold shadow-[0_4px_20px_rgba(99,102,241,0.3)] transition-all hover:shadow-[0_6px_25px_rgba(99,102,241,0.4)]"
            >
              Create Account
            </button>
          </form>

          <div className="text-center mt-8">
            <p className="text-[#6B7280]">
              <span>Already have an account? </span>
              <button
                onClick={() => navigate("/login")}
                className="text-[#6366F1] font-semibold hover:underline"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
