"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaHamburger, FaTimes } from "react-icons/fa";

const Drawer = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const handleToggle = () => {
    setShow((prev) => !prev);
  };

  const redirect = () => {
    handleToggle()
    router.push('/create')
  };

  return (
    <div className="block md:hidden">
      <div className="md:hidden block cursor-pointer" onClick={handleToggle}>
        {show ? null : <FaHamburger size={24} />}
      </div>
      <AnimatePresence>
        {show && (
          <>
            <motion.div
              className="fixed h-screen top-0 w-3/4 z-[9999] drop-shadow-lg px-4 py-4  left-0 bg-white"
              initial={{ x: -500 }}
              animate={{ x: 0, transition: { type: "tween" } }}
              exit={{ x: -500 }}
              transition={{ duration: 0.5 }}
            >
              <div
                onClick={handleToggle}
                className="flex justify-end mb-2 cursor-pointer"
              >
                <FaTimes size={24} />
              </div>
              <div
                onClick={handleToggle}
                className="hover:bg-slate-100 cursor-pointer p-2 rounded-md"
              >
                <Link href="/create">Create</Link>
              </div>
            </motion.div>
            <motion.div
              onClick={handleToggle}
              className="bg-black w-full left-0 top-0 bottom-0 opacity-65 z-[1000] fixed h-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            ></motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Drawer;
