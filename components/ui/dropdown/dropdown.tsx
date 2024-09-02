import React, {
  ButtonHTMLAttributes,
  createContext,
  Dispatch,
  HTMLAttributes,
  PropsWithChildren,
  RefObject,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { AiOutlineCaretUp } from "react-icons/ai";

interface Ibutton extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ComponentType<{ className?: string }>;
  rotate?: string;
  refz?: RefObject<HTMLButtonElement>;
}

interface IDiv extends HTMLAttributes<HTMLDivElement> {}

const DropdownContext = createContext<{
  setIsOpen: Dispatch<SetStateAction<string | null>>;
  isOpen: string | null;
}>({
  isOpen: null,
  setIsOpen: () => null,
});

const useDropdownContext = () => useContext(DropdownContext);

export const Dropdown: React.FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<string | null>(null);

  return (
    <DropdownContext.Provider
      value={{
        setIsOpen,
        isOpen,
      }}
    >
      {children}
    </DropdownContext.Provider>
  );
};

export const Container: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex relative h-full">{children}</div>;
};

export const Button: React.FC<PropsWithChildren & Ibutton> = ({
  children,
  icon: Icon = AiOutlineCaretUp,
  rotate = "rotate-90",
  refz,
  ...rest
}) => {
  const { isOpen, setIsOpen } = useDropdownContext();

  const handleOpen = () => {
    setIsOpen(isOpen === rest.id ? null : rest.id!);
  };

  return (
    <button
    ref={refz}
      onClick={handleOpen}
      {...rest}
      className={`${rest.className} text-sm font-bold flex items-center justify-between h-full border-l uppercase tracking-wider gap-2 px-4`}
    >
      {children}
      <Icon
        className={`transition-all duration-200 ${
          isOpen !== rest.id ? ` ${rotate}` : ""
        }`}
      />
    </button>
  );
};

export const List: React.FC<PropsWithChildren & IDiv> = ({
  children,
  ...rest
}) => {
  const { isOpen } = useDropdownContext();
  const { className, ...prop } = rest;

  return (
    <div
      {...prop}
      className={`bg-white shadow-xl absolute z-50 right-0 mt-1 w-60 overflow-y-auto rounded-lg ${className}  ${
        isOpen !== rest.id ? "h-1 opacity-0" : "opacity-1 h-auto"
      } `}
    >
      {children}
    </div>
  );
};

export const Item: React.FC<PropsWithChildren & IDiv> = ({
  children,
  ...rest
}) => {
  const { className, ...prop } = rest;
  return (
    <div
      {...prop}
      className={`block w-full p-2 cursor-pointer hover:bg-slate-50 uppercase tracking-tighter font-medium border-b ${className}`}
    >
      {children}
    </div>
  );
};
