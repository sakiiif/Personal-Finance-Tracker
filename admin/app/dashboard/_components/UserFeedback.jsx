'use client';
import React, { useEffect, useState } from 'react';

function UserFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const authAdminToken = localStorage.getItem('authTokenAdmin'); // Retrieve the token from localStorage

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch("http://localhost:3000/feedback/getFeedbacks", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFeedbacks(data || []);
        } else {
          console.error("Failed to fetch feedbacks. Status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchFeedbacks, 500);
    return () => clearTimeout(timer);
  }, [authAdminToken]);

  return (
    <div className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">User Feedback</h2>
      {loading ? (
        <div className="flex justify-center items-center space-x-2">
          <span className="text-gray-700">Loading feedbacks...</span>
          <div className="w-6 h-6 border-4 border-t-4 border-blue-600 rounded-full animate-spin"></div>
        </div>
      ) : feedbacks.length === 0 ? (
        <p className="text-center text-gray-500">No feedbacks available.</p>
      ) : (
        <ul className="space-y-4">
          {feedbacks.map((feedback) => (
            <li
              key={feedback.id}
              className="p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              <p className="text-md font-semibold  text-gray-700 ">{`Feedback ID: ${feedback.id}`}</p>
              <p className="text-sm text-gray-600 mt-2">"{feedback.feedback}"</p>
              <p className="text-xs mt-3">
                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                  Posted on: {new Date(feedback.datePosted).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserFeedback;