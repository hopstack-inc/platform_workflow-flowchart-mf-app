import React from "react";

export const Button = ({ onClick, title }) => {
  return (
    <button
      className="rounded-md shadow-md border text-medium my-2 text-base text-black border-blue-600 px-4 py-2 flex items-start justify-center"
      onClick={onClick}>
      {title}
    </button>
  );
};
