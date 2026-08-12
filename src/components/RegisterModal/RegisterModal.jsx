import React, { useEffect, useMemo, useState } from "react";
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
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateUsername = (value) => {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return "Please enter a username";
    }

    if (trimmedValue.length < 2) {
      return "Username should be at least 2 characters";
    }

    return "";
  };

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
      username: validateUsername(username),
      email: validateEmail(email),
      password: validatePassword(password),
    }),
    [username, email, password],
  );

  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
      setUsername("");
      setErrors({ username: "", email: "", password: "" });
      setTouched({ username: false, email: false, password: false });
      setIsSubmitted(false);
    }
  }, [isOpen]);

  const showUsernameError = (isSubmitted || touched.username) && nextErrors.username;
  const showEmailError = (isSubmitted || touched.email) && nextErrors.email;
  const showPasswordError = (isSubmitted || touched.password) && nextErrors.password;
  const isFormValid = !nextErrors.username && !nextErrors.email && !nextErrors.password;

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
    setErrors((currentErrors) => ({
      ...currentErrors,
      username: (isSubmitted || touched.username) ? validateUsername(value) : "",
    }));
  };

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

    const usernameError = validateUsername(username);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({
      username: usernameError,
      email: emailError,
      password: passwordError,
    });

    if (usernameError || emailError || passwordError) {
      return;
    }

    onSubmit({ email, password, username });
    setEmail("");
    setPassword("");
    setUsername("");
    setErrors({ username: "", email: "", password: "" });
    setTouched({ username: false, email: false, password: false });
    setIsSubmitted(false);
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
          className={`modal__input${showUsernameError ? " modal__input_error" : ""}`}
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
          onBlur={() => setTouched((currentTouched) => ({ ...currentTouched, username: true }))}
          aria-invalid={Boolean(showUsernameError)}
          aria-describedby={showUsernameError ? "register-username-error" : undefined}
        />
        <span id="register-username-error" className="modal__error">
          {showUsernameError || "\u00A0"}
        </span>
      </div>
      <div className="modal__field">
        <input
          type="email"
          className={`modal__input${showEmailError ? " modal__input_error" : ""}`}
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          onBlur={() => setTouched((currentTouched) => ({ ...currentTouched, email: true }))}
          aria-invalid={Boolean(showEmailError)}
          aria-describedby={showEmailError ? "register-email-error" : undefined}
        />
        <span id="register-email-error" className="modal__error">
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
          aria-describedby={showPasswordError ? "register-password-error" : undefined}
        />
        <span id="register-password-error" className="modal__error">
          {showPasswordError || "\u00A0"}
        </span>
      </div>
      <p className="modal__footer-text">
        Already have an account?{" "}
        <button
          type="button"
          className="modal__link-button"
          onClick={onSwitchToLogin}
          disabled={!isFormValid}
        >
          Sign in here
        </button>
      </p>
    </ModalWithForm>
  );
}
