import Link from "next/link";
import React, { Suspense } from "react";
import SubHeader from "./sub-header";
import Logo from "@/public/logo.png";
import Image from "next/image";
import Drawer from "@/components/drawer/drawer";

const linkLists = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "create",
    href: "/create",
  },
];

const Header = () => {
  const renderLink = linkLists.map((list) => (
    <li key={list.title} className="w-full block">
      <Link
        href={list.href}
        className="font-bold md:block hidden uppercase text-sm pb-2 transition-colors duration-300 tracking-wide hover:border-b hover:border-orange-500"
      >
        {list.title}
      </Link>
    </li>
  ));

  return (
    <>
      <nav className="h-20 bg-[#fafafa] border-b md:px-10 px-3 flex justify-between items-center">
        <div>
          <Image src={Logo.src} width={50} height={50} alt="logo" priority />
        </div>
        <div className="">
          <ul className="w-full flex gap-x-3 items-center">{renderLink}</ul>
        </div>
        <Drawer />
      </nav>
      <Suspense>
        <SubHeader />
      </Suspense>
    </>
  );
};

export default Header;
