import React from "react";
import "./ErrorMessage.css";

const ErrorMessage = ({
  message,
  type = "error",
  onRetry = null,
  onDismiss = null,
}) => {
  const getIcon = () => {
    switch (type) {
      case "warning":
        return "⚠️";
      case "info":
        return "ℹ️";
      case "success":
        return "✅";
      default:
        return "❌";
    }
  };

  return (
    <div className={`error-message ${type}`}>
      <div className="error-content">
        <span className="error-icon">{getIcon()}</span>
        <span className="error-text">{message}</span>
      </div>
      <div className="error-actions">
        {onRetry && (
          <button onClick={onRetry} className="error-btn retry-btn">
            Retry
          </button>
        )}
        {onDismiss && (
          <button onClick={onDismiss} className="error-btn dismiss-btn">
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
