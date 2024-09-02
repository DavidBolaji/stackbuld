import Loader from "@/components/loader/loader";
import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="h-[30vh] flex items-end justify-center">
      <Loader />
    </div>
  );
};

export default Loading;
