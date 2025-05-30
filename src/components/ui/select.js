import React from "react"; 
export function Select({ children, className }) {
    return (
      <select className={`border p-2 rounded w-full ${className}`}>
        {children}
      </select>
    );
  }
  