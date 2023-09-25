import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import InfoToolTip from './InfoToolTip';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

function Register({
  handleRegister,
  isOk,
  isOpen,
  onClose,
  error,
  isLoggedIn,
}) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation({
      email: '',
      password: '',
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      handleRegister(values.password, values.email);
    }
  };

  useEffect(() => {
    if (isLoggedIn) resetForm();
  }, [isLoggedIn, resetForm]);

  return (
    <div>
      <div className="register">
        <form className="register__form" onSubmit={handleSubmit} noValidate>
          <div className="register__up-wrapper">
            <h1 className="register__title">Регистрация</h1>

            <label className="form__input-label">
              <input
                type="email"
                className="register__input"
                placeholder="Email"
                autoComplete="current-email"
                value={values.email || ''}
                name="email"
                required={true}
                onChange={handleChange}
              />
              <span
                className={`form__input-error ${
                  isValid ? '' : 'form__input-error_active'
                }`}
              >
                {errors.email}
              </span>
            </label>
            <label className="form__input-label">
              <input
                type="password"
                className="register__input"
                placeholder="Пароль"
                autoComplete="current-password"
                value={values.password || ''}
                name="password"
                required={true}
                onChange={handleChange}
              />
              <span
                className={`form__input-error ${
                  isValid ? '' : 'form__input-error_active'
                }`}
              >
                {errors.password}
              </span>
            </label>
          </div>
          <div className="register__down-wrapper">
            <button
              className={`register__button ${
                isValid ? '' : 'register__button_disabled'
              }`}
              disabled={!isValid}
              type="submit"
            >
              Зарегистрироваться
            </button>
            <p className="register__text">
              Уже зарегистрированы?{' '}
              <Link to="/sign-in" className="register__text">
                Войти
              </Link>
            </p>
          </div>
        </form>
      </div>
      <InfoToolTip
        isOk={isOk}
        isOpen={isOpen}
        onClose={onClose}
        error={error}
      />
    </div>
  );
}

export default Register;
