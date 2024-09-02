import { Dispatch, SetStateAction } from "react";

export interface INotificationContext {
  isNotificationVisible: boolean;
  handleShowNotification: () => void;
  handleCloseNotification: () => void;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
}

