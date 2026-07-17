import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function LoginModal({
  isOpen,
  onClose,
  onSubmit,
  onSwitchToSignup,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
    setEmail("");
    setPassword("");
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Sign in"
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonText="Sign in"
    >
      <div className="modal__field">
        <input
          type="email"
          className="modal__input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="modal__field">
        <input
          type="password"
          className="modal__input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <p className="modal__footer-text">
        Don't have an account?{" "}
        <button
          type="button"
          className="modal__link-button"
          onClick={onSwitchToSignup}
        >
          Sign up
        </button>
      </p>
    </ModalWithForm>
  );
}
