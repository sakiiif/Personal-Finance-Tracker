"use client";

import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import UsersInfo from "./_components/UsersInfo";
import AdminInfo from "./_components/AdminInfo";
import Allexpense from "./_components/Allexpense";
import UserFeedback from "./_components/UserFeedback";
import AddMaintance from "./_components/AddMaintance";
import { FaSearch, FaTimes } from "react-icons/fa"; // Import icons

function Dashboard() {
  const [isClient, setIsClient] = useState(false);
  const [searchEmail, setSearchEmail] = useState("");
  const [adminData, setAdminData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const authTokenAdmin = localStorage.getItem("authTokenAdmin");

      if (authTokenAdmin) {
        const decodedToken = jwtDecode(authTokenAdmin);
        const expireAt = decodedToken.exp;
        const currentTime = Math.floor(Date.now() / 1000);
        if (expireAt < currentTime) {
          localStorage.removeItem("authTokenAdmin");
          router.push("/");
        }
      } else {
        router.push("/");
      }
    }
  }, [isClient, router]);

  const handleSearch = async () => {
    const authTokenAdmin = localStorage.getItem("authTokenAdmin");

    if (!authTokenAdmin || !searchEmail) return;

    const response = await fetch(
      `http://localhost:3000/admin/findbyEmail/${searchEmail}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authTokenAdmin}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      setAdminData(data);
      setShowModal(true); // Show the modal if data is received
    } else {
      alert("Admin not found or error occurred");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200 py-4">
        <div className="container mx-auto flex justify-between gap-2 items-center px-4 sm:px-6 lg:px-16">
          <div className="flex items-center">
            <Image
              src="/logo.svg"
              alt="logo"
              width={50}
              height={100}
              className="rounded-full"
            />
            <h1 className="text-blue-600 hidden md:block font-bold italic ml-3 text-xl">
              Expense
            </h1>
          </div>

          {/* Search Bar in the middle of the header */}
          <div className="relative flex items-center mx-auto w-full max-w-md">
            <input
              type="email"
              className="w-full px-4 py-2 sm:px-6 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400 text-gray-700 text-sm sm:text-base"
              placeholder="Search Admin by Email"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
            />
            <FaSearch
              className="absolute right-3 sm:right-4 text-gray-500 hover:text-blue-600 cursor-pointer transition-all duration-200"
              onClick={handleSearch}
              size={20}
            />
          </div>

          <Link href="/" passHref>
            <button
              className="px-5 py-2 bg-red-500 text-white text-sm font-semibold rounded-md hover:bg-red-600 transition-all focus:outline-none focus:ring-2 focus:ring-red-400 shadow-md"
              onClick={() => localStorage.removeItem("authTokenAdmin")}
            >
              Logout
            </button>
          </Link>
        </div>
      </header>

      <div className="lg:px-20 2xl:px-64 md:p-4 py-6">
        <div className="border rounded-xl bg-white shadow-lg p-6">
          <div className="gap-6">
            <div>
              <UsersInfo />
            </div>
            <div>{/* <AdminInfo /> */}</div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 my-6">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border">
              <UserFeedback />
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border">
              <AddMaintance />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border">
            <Allexpense />
          </div>
        </div>
      </div>

      {/* Modal for displaying Admin Data */}
      {showModal && adminData && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full relative">
            <FaTimes
              className="absolute top-3 right-3 text-gray-500 cursor-pointer"
              onClick={() => setShowModal(false)}
              size={20}
            />
            <h3 className="text-xl font-semibold mb-4 text-center text-blue-600">
              Admin Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-blue-600 font-semibold">Full Name:</span>
                <p className="ml-2 text-gray-800">{adminData.fullname}</p>
              </div>
              <div className="flex items-center">
                <span className="text-blue-600 font-semibold">Username:</span>
                <p className="ml-2 text-gray-800">{adminData.username}</p>
              </div>
              <div className="flex items-center">
                <span className="text-blue-600 font-semibold">Email:</span>
                <p className="ml-2 text-gray-800">{adminData.email}</p>
              </div>
            </div>
            <button
              className="mt-6 px-6 py-2 bg-red-500 text-white rounded-md"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
