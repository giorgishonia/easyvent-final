import React from "react";

export const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="flex items-center justify-center">
        <div className="loader"></div>
      </div>
    </div>
  );
};
