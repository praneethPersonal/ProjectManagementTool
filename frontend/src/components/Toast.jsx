import React, { useEffect } from "react";

const toastStyles = {
  position: "fixed",
  top: "24px",
  right: "24px",
  zIndex: 9999,
  background: "linear-gradient(90deg, #ff512f 0%, #dd2476 100%)",
  color: "#fff",
  padding: "16px 32px",
  borderRadius: "8px",
  fontWeight: "bold",
  fontSize: "1rem",
  boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
  animation: "fadeIn 0.3s"
};

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div style={toastStyles}>
      {message}
    </div>
  );
};

export default Toast;