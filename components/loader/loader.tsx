import React from "react";

const Loader = ({ ...rest }) => {
  const { className, ...prop } = rest;
  return (
    <div data-testid="loader" className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full h-5 w-5 border-t-4 border-b-4 border-orange-500 ${className}`}
        {...prop}
      ></div>
    </div>
  );
};

export default Loader;
