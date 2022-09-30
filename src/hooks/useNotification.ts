import { useContext } from "react";
import { notificationContext } from "../contexts/notificationContext";

export const useNotification = () => {
 const context = useContext(notificationContext)

  if (!context) {
    throw new Error('Not provider context');
  }

  return context;
};