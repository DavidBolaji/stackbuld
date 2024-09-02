"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { GiEmptyWoodBucket } from "react-icons/gi";

const colors = [
  "red",
  "green",
  "blue",
  "yellow",
  "orange",
  "red",
  "blue",
  "pink",
];

export const generateNumber = () => {
  return Math.floor(Math.random() * colors.length);
};

const Empty: React.FC<{ link: ReactNode }> = ({ link }) => {
  const [color, setColor] = useState(colors[generateNumber()]);
  useEffect(() => {
    const t = setInterval(() => {
      const num = generateNumber();
      setColor(colors[num]);
    }, 3000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="w-full h-96 flex items-center justify-center">
      <div className="flex flex-col text-center justify-center items-center">
        <GiEmptyWoodBucket
          color={color}
          size={120}
          className="animate animate-bounce"
          data-testid="bucket-icon"
        />
        <p className="italic ">No Product Click button below to add Product</p>
        {link}
      </div>
    </div>
  );
};

export { Empty };
