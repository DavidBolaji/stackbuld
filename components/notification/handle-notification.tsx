"use client"
import React from "react";
import Notification from "./notification";
import { useNotificationContext } from "./notification-context";

const HandleNotification = () => {
  const { isNotificationVisible, message, handleCloseNotification } =
    useNotificationContext();
  return (
    <Notification
      isOpen={isNotificationVisible}
      message={message}
      onClose={handleCloseNotification}
    />
  );
};

export default HandleNotification;
