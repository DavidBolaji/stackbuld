import { usePortal } from "@/hooks/use-portal";
import { AnimatePresence, motion } from "framer-motion";
import ReactDOM from "react-dom";
import { FaCheckCircle, FaTimes, FaTimesCircle } from "react-icons/fa";

interface INotification {
  isOpen: boolean;
  message: string;
  onClose: () => void;
  type?: "success" | "error";
}

const Notification: React.FC<INotification> = ({
  isOpen,
  message,
  onClose,
  type = "success",
}) => {
  const target = usePortal("notification-root");

  if (!target) return null;

  return ReactDOM.createPortal(
    <AnimatePresence mode="wait" onExitComplete={onClose}>
      {isOpen && (
        <motion.div
        initial={{
          x: 112,
          opacity: 0
        }}
        animate={{
          x: 0,
          opacity: 1,
          transition: {type: "spring"}
        }}
        exit={{
          x: 112,
          opacity: 0,
          transition: {type: "spring"}
        }}
        transition={{ duration: 0.4 }}
          className={`fixed rounded-md w-3/4 overflow-hidden border-0 top-5 h-20 md:w-1/2 lg:w-1/4 z-50 shadow right-1  bg-white ${
            type === "success" ? "text-green-600" : "text-red-600"
          } text-white `}
        >
          <div className="grid grid-cols-5 h-full">
            <div className="col col-span-1 h-full bg-slate-100">
              <div className="w-full h-full flex items-center justify-center">
                {type === "success" ? (
                  <FaCheckCircle color="green" size={30} />
                ) : (
                  <FaTimesCircle color="red" size={30} />
                )}
              </div>
            </div>
            <div className="col-span-4  h-full px-5 py-2">
              <p className="w-full h-full flex items-center text-sm text-black">
                {message}
              </p>
            </div>
            <button
              onClick={onClose}
              className="absolute top-3 right-3 font-thin bg-transparent border-0 cursor-pointer"
            >
              <FaTimes color="grey" size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    target
  );
};

export default Notification;
