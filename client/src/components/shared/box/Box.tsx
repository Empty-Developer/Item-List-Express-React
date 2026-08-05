import React from "react";
import { Button } from "../../ui/button/Button";
import { Input } from "../../ui/input/Input";
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
