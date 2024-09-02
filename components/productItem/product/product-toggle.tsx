"use client"
import { FaEdit, FaPowerOff } from "react-icons/fa";
import { useProductContext } from "./product-context";

export const Toggle = () => {
  const { isEditing, setIsEditing } = useProductContext();

  const handleSlide = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <div
      onClick={handleSlide}
      className={`w-16 shadow-inner h-8 overflow-hidden relative transition-colors delay-100 duration-300 rounded-full snap-both ${
        isEditing ? "bg-orange-500" : "bg-slate-200"
      }`}
    >
      <div
        className={`w-8 h-8 flex items-center justify-center bg-white transition-transform duration-300 rounded-full shadow-inner ${
          isEditing ? "translate-x-full" : "translate-x-0"
        }`}
      >
        {isEditing ? (
          <FaPowerOff color="green" size={12} />
        ) : (
          <FaEdit size={12} color="green" />
        )}
      </div>
    </div>
  );
};
