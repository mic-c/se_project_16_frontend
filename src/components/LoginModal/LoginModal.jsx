import React, { useEffect, useMemo, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function LoginModal({
  isOpen,
  onClose,
  onSubmit,
  onSwitchToSignup,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (value) => {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return "Please enter an email";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
      return "Please enter a valid email address";
    }

    return "";
  };

  const validatePassword = (value) => {
    if (!value.trim()) {
      return "Please enter a password";
    }

    if (value.trim().length < 8) {
      return "Password should be at least 8 characters";
    }

    return "";
  };

  const nextErrors = useMemo(
    () => ({
      email: validateEmail(email),
      password: validatePassword(password),
    }),
    [email, password],
  );

  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
      setErrors({ email: "", password: "" });
      setTouched({ email: false, password: false });
      setIsSubmitted(false);
    }
  }, [isOpen]);

  const showEmailError = (isSubmitted || touched.email) && nextErrors.email;
  const showPasswordError = (isSubmitted || touched.password) && nextErrors.password;
  const isFormValid = !nextErrors.email && !nextErrors.password;

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    setErrors((currentErrors) => ({
      ...currentErrors,
      email: (isSubmitted || touched.email) ? validateEmail(value) : "",
    }));
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    setErrors((currentErrors) => ({
      ...currentErrors,
      password: (isSubmitted || touched.password) ? validatePassword(value) : "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({ email: emailError, password: passwordError });

    if (emailError || passwordError) {
      return;
    }

    onSubmit({ email, password });
    setEmail("");
    setPassword("");
    setErrors({ email: "", password: "" });
    setTouched({ email: false, password: false });
    setIsSubmitted(false);
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
          className={`modal__input${showEmailError ? " modal__input_error" : ""}`}
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          onBlur={() => setTouched((currentTouched) => ({ ...currentTouched, email: true }))}
          aria-invalid={Boolean(showEmailError)}
          aria-describedby={showEmailError ? "login-email-error" : undefined}
        />
        <span id="login-email-error" className="modal__error">
          {showEmailError || "\u00A0"}
        </span>
      </div>
      <div className="modal__field">
        <input
          type="password"
          className={`modal__input${showPasswordError ? " modal__input_error" : ""}`}
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          onBlur={() => setTouched((currentTouched) => ({ ...currentTouched, password: true }))}
          aria-invalid={Boolean(showPasswordError)}
          aria-describedby={showPasswordError ? "login-password-error" : undefined}
        />
        <span id="login-password-error" className="modal__error">
          {showPasswordError || "\u00A0"}
        </span>
      </div>
      <p className="modal__footer-text">
        Don't have an account?{" "}
        <button
          type="button"
          className="modal__link-button"
          onClick={onSwitchToSignup}
          disabled={!isFormValid}
        >
          Sign up
        </button>
      </p>
    </ModalWithForm>
  );
}
