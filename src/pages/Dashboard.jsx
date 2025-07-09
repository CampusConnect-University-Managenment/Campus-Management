import React from "react";

const Dashboard = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Welcome to your{" "}
        <span className="font-bold text-indigo-700">Academix</span> dashboard!
      </h2>
      <p className="text-gray-600">
        You can manage your courses, view exam results, practice exams, and
        track your performance all in one place.
      </p>
    </div>
  );
};

export default Dashboard;
