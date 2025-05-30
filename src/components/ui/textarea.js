import React from "react"; 
export function Textarea({ placeholder, className }) {
    return (
      <textarea
        placeholder={placeholder}
        className={`border p-2 rounded w-full ${className}`}
      ></textarea>
    );
  }
  