import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
function ManageStore() {
  const navigate = useNavigate();
  const [manager, setManager] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        setLoading(true);

        let token = localStorage.getItem("token");
        const data = await fetch("http://localhost:8081/api/managerList", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const fetchedManagers = await data.json();
        const manager = fetchedManagers.fetchedUsers;
        setManager(manager);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch managers");
        setLoading(false);
      }
    };

    fetchManagers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading managers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
          <p className="font-semibold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }
  const handleManager = (manager) => {
    console.log(" the manager email is", manager[0].email);
    navigate("/SingleManagerAnalysis");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Store Managers
          </h1>
          <p className="text-gray-600">Manage and view all store managers</p>
        </div>

        {/* Managers Count */}
        <div className="mb-6">
          <div className="bg-blue-100 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800">
              <span className="font-semibold">{manager.length}</span> manager
              {manager.length !== 1 ? "s" : ""} found
            </p>
          </div>
        </div>

        {/* Managers Grid */}
        {manager.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {manager.map((i, index) => (
              <div
                key={i.id || index}
                className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-lg">
                      {i.name ? i.name.charAt(0).toUpperCase() : "M"}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {i.name}
                    </h3>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                    </svg>
                    <span className="text-sm">{i.email}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handleManager(manager)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No managers found
            </h3>
            <p className="text-gray-500">
              There are currently no store managers to display.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageStore;
