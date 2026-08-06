import React from "react";
import "./Box.css";

interface BoxProps {
  children?: React.ReactNode;
}

export default function Box({ children }: BoxProps) {
  return (
    <div className="box-container">
      {children}
    </div>
  );
}
