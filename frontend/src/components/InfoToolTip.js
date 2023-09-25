import React from 'react';
import good from '../images/register/good.svg';
import bad from '../images/register/bad.svg';
import { useLocation, useNavigate } from 'react-router-dom';

const InfoToolTip = ({ onClose, isOpen, isOk, error }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const closePopup = () => {
    if (isOk) {
      onClose();
      if (location.pathname === '/sign-up') {
        navigate('/sign-in');
      }
    } else {
      onClose();
    }
  };

  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__block">
        <button className="popup__close" type="button" onClick={closePopup} />
        {isOk && (
          <>
            <img
              src={good}
              alt="Регистрация прошла успешно иконка"
              className="popup__icon"
            />
            <p className="popup__text">Вы успешно зарегистрировались!</p>
          </>
        )}
        {!isOk && (
          <>
            <img
              src={bad}
              alt="Что-то пошло не так иконка"
              className="popup__icon"
            />
            <p className="popup__text">
              {error.message ??
                'Что-то пошло не так!\n' + 'Попробуйте ещё раз.'}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default InfoToolTip;
