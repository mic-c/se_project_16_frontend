import React, { useEffect } from "react";
import "./ModalWithForm.css";

export default function ModalWithForm({
  isOpen,
  title,
  onClose,
  onSubmit,
  children,
  submitButtonText = "Submit",
}) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleEscClose = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscClose);

    return () => {
      window.removeEventListener("keydown", handleEscClose);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>
          ×
        </button>
        <h2 className="modal-title">{title}</h2>
        <form className="modal-form" onSubmit={onSubmit}>
          {children}
          <button type="submit" className="modal-submit-button">
            {submitButtonText}
          </button>
        </form>
      </div>
    </div>
  );
}
