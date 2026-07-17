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
    <div className="modal" onClick={handleBackdropClick}>
      <div className="modal__content">
        <button className="modal__close-button" onClick={onClose}>
          ×
        </button>
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <button type="submit" className="modal__submit-button">
            {submitButtonText}
          </button>
        </form>
      </div>
    </div>
  );
}
