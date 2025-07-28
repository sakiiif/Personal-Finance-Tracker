'use client';
import React, { useEffect, useState } from 'react';

function AdminInfo() {
  const [adminInfo, setAdminInfo] = useState(null); // Admin info to store
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const authTokenAdmin = localStorage.getItem('authTokenAdmin'); // Get the token from localStorage

  const adminEmail = "emon@gmail.com"; // Set admin email here or dynamically

  useEffect(() => {
    const fetchAdminInfo = async () => {
      try {
        const response = await fetch(`http://localhost:3000/admin/findbyEmail/${adminEmail}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokenAdmin}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(`adminInfo ${data}`);
          setAdminInfo(data); // Set the response data to state
        } else {
          setError("Failed to fetch admin info.");
        }
      } catch (error) {
        setError("Error fetching admin info.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminInfo();
  }, [adminEmail, authTokenAdmin]);

  if (loading) {
    return <p>Loading admin info...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-4 border">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Admin Information</h2>
      {adminInfo ? (
        <>
          <p className="text-sm text-gray-600">
            <strong>Name:</strong> {adminInfo.name}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Email:</strong> {adminInfo.email}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Role:</strong> {adminInfo.role}
          </p>
        </>
      ) : (
        <p>No admin information available.</p>
      )}
    </div>
  );
}

export default AdminInfo;
