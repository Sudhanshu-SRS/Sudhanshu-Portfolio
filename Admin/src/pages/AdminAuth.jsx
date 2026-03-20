// src/pages/AdminAuth.jsx
import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

/* ================= REUSABLE INPUT ================= */
const InputField = ({ type, label, value, onChange, extra = "" }) => (
  <div className="relative">
    <input
      type={type}
      value={value}
      required
      className={`peer input-advanced ${extra}`}
      onChange={onChange}
    />
    <label className="label-advanced">{label}</label>
  </div>
);

/* ================= BUTTON ================= */
const Button = ({ children, loading }) => (
  <button
    disabled={loading}
    className="btn-advanced w-full flex justify-center items-center gap-2 disabled:opacity-50"
  >
    {loading ? "Processing..." : children}
  </button>
);

export default function AdminAuth() {
  const [step, setStep] = useState("login");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  /* ================= LOGIN ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/api/admin/login", form);
      setStep("otp");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= VERIFY ================= */
  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/api/admin/verify-otp", {
        email: form.email,
        otp,
      });

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ================= RESET ================= */
  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/api/admin/reset-password", { email });
      alert("Reset link sent!");
      setStep("login");
    } catch (err) {
      alert(err.response?.data?.message || "Error sending email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden px-4">

      {/* 🌌 Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#7c3aed,_transparent_40%),radial-gradient(circle_at_bottom_right,_#2563eb,_transparent_40%)] opacity-30 animate-pulse"></div>

      {/* Glow Orbs */}
      <div className="absolute w-[400px] h-[400px] md:w-[500px] md:h-[500px] bg-purple-600 rounded-full blur-[120px] opacity-20 top-[-100px] left-[-100px]"></div>
      <div className="absolute w-[400px] h-[400px] md:w-[500px] md:h-[500px] bg-blue-600 rounded-full blur-[120px] opacity-20 bottom-[-100px] right-[-100px]"></div>

      {/* Card */}
      <div className="relative w-full max-w-md p-[1px] rounded-3xl bg-gradient-to-br from-white/20 to-white/5 shadow-[0_0_40px_rgba(124,58,237,0.3)]">

        <div className="backdrop-blur-2xl bg-black/60 rounded-3xl p-6 sm:p-8 text-white">

          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-wide">
              Admin Access
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-2">
              Secure dashboard login
            </p>
          </div>

          {/* ================= LOGIN ================= */}
          {step === "login" && (
            <form onSubmit={handleSubmit} className="space-y-5 flex flex-col justify-between h-[300px]">

              <InputField
                type="email"
                label="Email"
                value={form.email}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, email: e.target.value }))
                }
              />

              <InputField
                type="password"
                label="Password"
                value={form.password}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, password: e.target.value }))
                }
              />

              <Button loading={loading}>Send OTP →</Button>

              <p
                className="text-sm text-gray-400 hover:text-white cursor-pointer text-center transition"
                onClick={() => setStep("forgot")}
              >
                Forgot Password?
              </p>
            </form>
          )}

          {/* ================= OTP ================= */}
          {step === "otp" && (
            <form onSubmit={handleVerify} className="space-y-5 flex flex-col justify-between h-[200px]">

              <InputField
                type="text"
                label="Enter OTP"
                value={otp}
                extra="text-center tracking-[0.4em]"
                onChange={(e) => setOtp(e.target.value)}
              />

              <Button loading={loading}>Verify OTP →</Button>

              <p
                className="text-sm text-gray-400 hover:text-white cursor-pointer text-center"
                onClick={() => setStep("login")}
              >
                Back to Login
              </p>
            </form>
          )}

          {/* ================= FORGOT ================= */}
          {step === "forgot" && (
            <form onSubmit={handleReset} className="space-y-5 flex flex-col justify-between h-[200px] w-full">

              <InputField
                type="email"
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button loading={loading}>
                Send Reset Link →
              </Button>

              <p
                className="text-sm text-gray-400 hover:text-white cursor-pointer text-center"
                onClick={() => setStep("login")}
              >
                Back to Login
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}