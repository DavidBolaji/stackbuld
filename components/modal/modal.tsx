import { usePortal } from "@/hooks/use-portal";
import { AnimatePresence, motion } from "framer-motion";
import { PropsWithChildren } from "react";
import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa";

interface IModal {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<PropsWithChildren & IModal> = ({
  isOpen,
  onClose,
  children,
}) => {
  const target = usePortal("modal-root");

  if (!target) return null;

  return ReactDOM.createPortal(
    <AnimatePresence mode="wait" onExitComplete={onClose} >
      {isOpen && (
        <motion.div
         data-testid="modalBackdrop"
         key="modalBackdrop"
          className={`fixed top-0 z-50 left-0 w-screen h-screen bg-[rgba(0,0,0,0.75)] flex items-center justify-center`}
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
            transition: { duration: 1}
          }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            data-testid="modalContent"
            key="modalContent"
            transition={{ duration: 0.5, ease: "linear" }}
            initial={{
              y: -400,
              opacity: 0
            }}
            animate={{
              y: 0,
              opacity: 1,
              transition: {type: "spring"}
            }}
            exit={{
              y: -400,
              opacity: 0,
              transition: {type: "spring"}
            }}
            
            className="bg-white p-6 rounded-md shadow-2xl relative max-w-sm md:max-w-md lg:max-w-lg w-full"
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 bg-transparent border-0 cursor-pointer"
            >
              <FaTimes />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    target
  );
};

export default Modal;
