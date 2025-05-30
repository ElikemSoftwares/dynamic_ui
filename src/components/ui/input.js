import React from "react"; 
export function Input({ placeholder, type = "text", className }) {
    return (
      <input
        type={type}
        placeholder={placeholder}
        className={`border p-2 rounded w-full ${className}`}
      />
    );
  }
  