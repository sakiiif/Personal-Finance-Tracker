'use client';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UsersInfo() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [promoteError, setPromoteError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('authTokenAdmin');
        if (!token) {
          setError('Authorization token not found');
          return;
        }

        const response = await fetch('http://localhost:3000/user/all', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handlePromote = async (userEmail) => {
    try {
      const token = localStorage.getItem('authTokenAdmin');
      if (!token) {
        setPromoteError('Authorization token not found');
        return;
      }

      const response = await fetch('http://localhost:3000/user/adminpromote', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to promote user');
      }

      const data = await response.json();

      // Show success toast notification
      toast.success(`User ${data.admin.username} successfully promoted to admin!`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    } catch (error) {
      setPromoteError(error.message);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem('authTokenAdmin');
      if (!token) {
        setDeleteError('Authorization token not found');
        return;
      }

      const response = await fetch(`http://localhost:3000/user/admin/deleteuser/${userId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      const data = await response.json();

      // Show success toast notification
      toast.success(`User ${data.username} successfully deleted!`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });

      // Remove the deleted user from the state
      setUserData(userData.filter(user => user.id !== userId));
    } catch (error) {
      setDeleteError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Users Information</h2>
        <div className="flex justify-center items-center space-x-2">
          <span className="text-gray-700">Loading...</span>
          <div className="w-6 h-6 border-4 border-t-4 border-blue-600 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Error</h2>
        <p className="text-red-600 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Users Information</h2>

      {promoteError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center">
          {promoteError}
        </div>
      )}

      {deleteError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center">
          {deleteError}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border border-gray-200 rounded-lg shadow-md bg-white">
          <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <tr>
              <th className="px-6 py-4 border text-left">#</th>
              <th className="px-6 py-4 border text-left">Full Name</th>
              <th className="px-6 py-4 border text-left">Username</th>
              <th className="px-6 py-4 border text-left">Email</th>
              <th className="px-6 py-4 border text-left">Role</th>
              <th className="px-6 py-4 border text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, index) => (
              <tr key={user.email} className="hover:bg-gray-50 transition-all duration-200">
                <td className="px-6 py-4 border text-left text-gray-700">{index + 1}</td>
                <td className="px-6 py-4 border text-left text-gray-700">{user.fullname}</td>
                <td className="px-6 py-4 border text-left text-gray-700">{user.username}</td>
                <td className="px-6 py-4 border text-left text-gray-700">{user.email}</td>
                <td className="px-6 py-4 border text-left text-gray-700">{user.role}</td>
                <td className="px-6 py-4 border text-center">
                  <button
                    onClick={() => handlePromote(user.email)}
                    className="py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-md"
                  >
                    Promote
                  </button>
                  {/* <button
                    onClick={() => handleDelete(user.id)} // Assuming user.id is the unique identifier
                    className="py-2 px-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-md ml-2"
                  >
                    Delete
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersInfo;