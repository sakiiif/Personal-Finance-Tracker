'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineUser, AiOutlineMail, AiOutlineLock, AiOutlineHome } from 'react-icons/ai'; // Icons for password visibility toggle
import { toast, ToastContainer } from 'react-toastify'; // Toast notifications
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import ForgetPasswordModal from "../_components/ForgetPasswordModal";

const SignUp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  // Validate password strength before submitting
  const isPasswordValid = (password) => {
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullname || !formData.username || !formData.email || !formData.password) {
      setError('All fields are required');
      toast.error('All fields are required');
      return;
    }

    if (!isPasswordValid(formData.password)) {
      setError(
        'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a digit, and a special character.'
      );
      toast.error(
        'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a digit, and a special character.'
      );
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Signup failed');
      }

      const response = await res.json();
      console.log(response);

      // Store the token in localStorage if returned from the backend
      if (response.access_token) {
        localStorage.setItem('authTokenAdmin', response.access_token);
      }

      toast.success('Sign Up Successful! Redirecting to Sign In...');

      // Redirect to the dashboard after successful signup (or sign-in if needed)
      setTimeout(() => {
        router.push('/sign-in'); 
      }, 2000);
    } catch (error) {
      console.error(error.message);
      setError(error.message || 'Something went wrong, please try again.');
      toast.error(error.message || 'Something went wrong, please try again.');
    }
  };

  return (
    <div>
  <header className="bg-white p-4 flex justify-between shadow-md items-center z-50 px-4 md:px-10 xl:px-16 2xl:px-48">
    {/* Logo */}
    <div className="flex items-center">
      <img
        src="/logo.png" // Replace with your logo path
        alt="Logo"
        className="h-12"
      />
    </div>

    {/* Sign In / Sign Up Buttons with Links */}
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

  <div className="min-h-screen bg-gradient-to-r bg-gray-300 flex items-center justify-center lg:py-10">
    <div className="bg-white p-8 rounded-lg shadow-xl max-w-4xl w-full transform transition-all duration-500  flex">
      {/* Image and Text Section (Hidden on mobile, visible on lg+) */}
      <div className="hidden lg:flex w-1/2 p-8  flex-col justify-center items-center bg-blue-600 text-white rounded-l-lg">
        <img
          src="/admin5.avif"
          alt="Admin Signup"
          className="w-64 h-64 mb-6"
        />
        <h2 className="text-3xl font-bold mb-4">Welcome to Admin Dashboard</h2>
        <p className="text-center">
          Join our platform to manage and monitor your organization's activities with ease. Sign up now to get started!
        </p>
      </div>

      {/* Signup Form Section */}
      <div className="w-full lg:w-1/2 p-8">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6 animate__animated animate__fadeIn animate__delay-1s">
          Sign Up
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Full Name Field */}
          <div className="mb-4 relative">
            <label htmlFor="fullname" className="block text-gray-700">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                className="w-full px-4 py-3 pl-10 mt-2 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                placeholder="Enter your full name"
                required
              />
              <AiOutlineUser className="absolute left-3 mt-1 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
            </div>
          </div>

          {/* Username Field */}
          <div className="mb-4 relative">
            <label htmlFor="username" className="block text-gray-700">
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 pl-10 mt-2 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                placeholder="Enter your username"
                required
              />
              <AiOutlineUser className="absolute mt-1 left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
            </div>
          </div>

          {/* Email Field */}
          <div className="mb-4 relative">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
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
              <AiOutlineMail className="absolute mt-1 left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 pl-10 mt-2 border rounded-md text-gray-700 pr-10 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                placeholder="Enter your password"
                required
              />
              <AiOutlineLock className="absolute mt-1 left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 transition-transform duration-300"
              >
                {passwordVisible ? (
                  <AiOutlineEyeInvisible className="h-5 w-5 mt-2" />
                ) : (
                  <AiOutlineEye className="h-5 w-5 mt-2" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition transform duration-300 hover:scale-105"
          >
            Sign Up
          </button>
        </form>

        {/* Forgot Password Link */}
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-blue-600 hover:underline transition-all"
          >
            Forgot Password?
          </button>
        </div>

        <div className="mt-6 text-center">
          <div className="text-gray-700">
            Already have an account?{' '}
            <Link href="/sign-in">
              <h1 className="text-blue-600 hover:underline transition-all">Sign In</h1>
            </Link>
          </div>
        </div>
      </div>
    </div>

    {/* Forget Password Modal */}
    <ForgetPasswordModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
    />

    {/* React Toastify container to show notifications */}
    <ToastContainer />
  </div>

  <footer className="bg-gray-800 text-white py-6">
    <div className="container mx-auto text-center">
      <p className="text-lg">
        &copy; {new Date().getFullYear()} Admin Dashboard. All rights reserved.
      </p>
    </div>
  </footer>
</div>

  );
};

export default SignUp;