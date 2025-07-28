'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddMaintenance() {
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve token from localStorage
    const token = localStorage.getItem('authTokenAdmin');
    if (!token) {
      toast.error('Authorization token is missing!');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/maintenance/create',
        { message: description }, // Request body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token in header
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        toast.success('Maintenance message added successfully!');
        setDescription(''); // Clear the input
      }
    } catch (error) {
      console.error('Error adding maintenance:', error);
      toast.error('Failed to add maintenance. Please try again.');
    }
  };

  return (
    <div className="px-8  bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add Maintenance</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows="4"
          placeholder="Describe the maintenance..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddMaintenance;
