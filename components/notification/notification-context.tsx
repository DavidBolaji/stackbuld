"use client";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { INotificationContext } from "./notification.interface";

const NotificationContext = createContext<INotificationContext>({
  isNotificationVisible: false,
  handleCloseNotification: () => null,
  handleShowNotification: () => null,
  setMessage: () => null,
  message: "",
});

export const useNotificationContext = () => useContext(NotificationContext);

export const Notification: React.FC<PropsWithChildren> = ({children}) => {
  const [isNotificationVisible, setNotificationVisible] = useState(false);
  const [message, setMessage] = useState("");


  const handleShowNotification = () => {
    setNotificationVisible(true);
  };

  const handleCloseNotification = () => {
    setNotificationVisible(false);
  };

  return (
    <NotificationContext.Provider
      value={{
        handleShowNotification,
        handleCloseNotification,
        isNotificationVisible,
        message,
        setMessage
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
