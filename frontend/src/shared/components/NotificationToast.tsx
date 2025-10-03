import { X, CheckCircle, AlertTriangle } from "lucide-react";
import React from "react";

export type Notification = {
  message: string;
  type: "success" | "error";
};

interface NotificationToastProps {
  notification: Notification | null;
  onDismiss: () => void;
}

const NotificationToast: React.FC<NotificationToastProps> = ({
  notification,
  onDismiss,
}) => {
  if (!notification) return null;

  const { message, type } = notification;

  const Icon = type === "success" ? CheckCircle : AlertTriangle;
  const colorClass = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-xl flex items-center text-white transition-opacity duration-300 ${colorClass}`}
    >
      <Icon size={20} className="mr-2" />
      <p className="font-medium">{message}</p>
      <button
        onClick={onDismiss}
        className="ml-4 p-1 rounded-full hover:bg-white/20"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default NotificationToast;
