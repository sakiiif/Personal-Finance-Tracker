"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineMail, AiOutlineLock, AiOutlineHome } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgetPasswordModal from "../_components/ForgetPasswordModal";

const SignIn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("All fields are required");
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Sign In failed");
      }

      const response = await res.json();
      console.log(response);

      if (response.access_token) {
        localStorage.setItem("authTokenAdmin", response.access_token);
      }

      toast.success("Sign In Successful! Redirecting to Dashboard...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error) {
      console.error(error.message);
      setError(error.message || "Something went wrong, please try again.");
      toast.error(error.message || "Something went wrong, please try again.");
    }
  };

  return (
    <div>
  <header className="bg-white p-4 flex justify-between shadow-md items-center z-50 px-4 md:px-10 xl:px-16 2xl:px-48">
    <div className="flex items-center">
      <img src="/logo.png" alt="Logo" className="h-12" />
    </div>
    <div className="flex space-x-4">
      <Link
        href="/sign-in"
        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300 text-lg font-semibold"
      >
        Sign In
      </Link>
      <Link
        href="/sign-up"
        className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300 text-lg font-semibold"
      >
        Sign Up
      </Link>
    </div>
  </header>

  <div className="min-h-screen bg-gradient-to-r bg-gray-300 flex items-center justify-center">
    <div className="bg-white p-8 rounded-lg shadow-xl max-w-4xl w-full transform transition-all duration-500 hover:scale-105 flex flex-col lg:flex-row">
      {/* Left Side - Hidden in mobile */}
      <div className="lg:w-1/2 p-8  flex-col justify-center items-center bg-blue-600 text-white rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none hidden lg:flex">
        <img src="/admin5.avif" alt="Admin SignIn" className="w-64 h-64 mb-6" />
        <h2 className="text-3xl font-bold mb-4">Welcome Back</h2>
        <p className="text-center">Sign in to access your account and manage everything efficiently.</p>
      </div>

      {/* Right Side - Sign In Form */}
      <div className="w-full lg:w-1/2 p-8">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">Sign In</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 pl-10 mt-2 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                placeholder="Enter your email"
                required
              />
              <AiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
            </div>
          </div>

          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 pl-10 mt-2 border rounded-md text-gray-700 pr-10 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                placeholder="Enter your password"
                required
              />
              <AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {passwordVisible ? <AiOutlineEyeInvisible className="h-5 w-5" /> : <AiOutlineEye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button type="submit" className="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition transform duration-300 hover:scale-105">Sign In</button>
        </form>

        <div className="mt-4 text-center">
          <button onClick={() => setIsModalOpen(true)} className="text-blue-600 hover:underline transition-all">Forgot Password?</button>
        </div>

        <div className="mt-6 text-center">
          <div className="text-gray-700">Don't have an account? <Link href="/sign-up" className="text-blue-600 hover:underline transition-all">Sign Up</Link></div>
        </div>
      </div>
    </div>
    <ForgetPasswordModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    <ToastContainer />
  </div>

  <footer className="bg-gray-800 text-white py-6">
    <div className="container mx-auto text-center">
      <p className="text-lg">&copy; {new Date().getFullYear()} Admin Dashboard. All rights reserved.</p>
    </div>
  </footer>
</div>
  );
};

export default SignIn;
