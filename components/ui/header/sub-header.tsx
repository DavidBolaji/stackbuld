"use client";

import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import * as Dropdown from "../dropdown/dropdown";
import { AiOutlineCaretDown } from "react-icons/ai";
import { filterProduct } from "@/actions/filter";

const buttonList = [
  {
    title: "filter by",
    direction: "",
    list: [
      {
        text: "Categories",
        search: "category",
        list: ["Shirt", "Polo"],
      },
      {
        text: "Price",
        search: "price",
        list: ["$1 - $10", "$10 - $20", "$20 - $30", "$30 - $40", "$50 +"],
      },
    ],
  },
];

const SubHeader: React.FC = () => {
  const path = usePathname();
  const searchParams = useSearchParams();
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [origin, setOrigin] = useState("/");

  useEffect(() => {
    const urlParams = searchParams.get("cat");
    setOrigin(path !== "/" ? path.split('/')[1] : urlParams?.trim().length ? urlParams : "/");
  }, [path, searchParams]);

  const handleItemClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const checkbox = e.currentTarget.querySelector(
      'input[type="checkbox"]'
    ) as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = !checkbox.checked;
    }
    btnRef.current?.click();
  };

  // Function to determine if the checkbox should be checked
  const isChecked = (name: string, value: string) => {
    const paramValues = searchParams.get(name)?.split(",");
    return paramValues?.includes(value) || false;
  };

  return (
    <div className="h-14 z-50 bg-[#fafafa] border-b md:px-10 px-3 flex justify-between items-center sticky top-0">
      {origin !== "/" && (
        <div className="uppercase font-bold border-l border-r h-full flex items-center px-8 text-sm">
          {origin}
        </div>
      )}
      {origin === "/" && (
        <form
          action={filterProduct}
          className="flex h-full justify-end items-end w-full"
        >
          <Dropdown.Dropdown>
            {buttonList.map(({ title, list, direction }) => (
              <Dropdown.Container key={title}>
                <Dropdown.Button
                  icon={AiOutlineCaretDown}
                  id={title}
                  type="button"
                  rotate="rotate-180"
                >
                  {title}
                </Dropdown.Button>
                <Dropdown.List className={`mt-14 ${direction}`} id={title}>
                  {list.map(({ text, list, search }) => (
                    <Dropdown.Item
                      className="gap-x-2 border-b-0 hover:bg-transparent"
                      key={text}
                    >
                      <div className="bg-slate-200 px-1 py-1 rounded-md font-medium">
                        {text}
                      </div>

                      {list.map((el) => (
                        <button
                          key={el}
                          type="submit"
                          className="text-sm w-full text-left gap-x-2 flex pl-1"
                        >
                          <Dropdown.Item
                            className="space-x-2"
                            onClick={handleItemClick}
                          >
                            <input
                              name={`${text}[]`}
                              value={el}
                              type="checkbox"
                              className="bg-green-300"
                              defaultChecked={isChecked(`prod_${search}`, el)}
                            />

                            <div className="inline">{el}</div>
                          </Dropdown.Item>
                        </button>
                      ))}
                    </Dropdown.Item>
                  ))}
                </Dropdown.List>
              </Dropdown.Container>
            ))}
          </Dropdown.Dropdown>
        </form>
      )}
    </div>
  );
};

export default SubHeader;
