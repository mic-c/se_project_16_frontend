import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function RegisterModal({
  isOpen,
  onClose,
  onSubmit,
  onSwitchToLogin,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password, username });
    setEmail("");
    setPassword("");
    setUsername("");
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Sign Up"
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonText="Sign Up"
    >
      <div className="modal__field">
        <input
          type="text"
          className="modal__input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
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
        Already have an account?{" "}
        <button
          type="button"
          className="modal__link-button"
          onClick={onSwitchToLogin}
        >
          Sign in here
        </button>
      </p>
    </ModalWithForm>
  );
}
