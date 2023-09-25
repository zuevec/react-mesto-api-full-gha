import React, { useContext, useEffect, useState } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const [name, setName] = useState('');
  const [workplace, setWorkplace] = useState('');
  const currentUser = useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: workplace,
    });
  }

  useEffect(() => {
    if (currentUser.name && currentUser.about) {
      setName(currentUser.name);
      setWorkplace(currentUser.about);
    }
  }, [currentUser, isOpen]);

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onJobChange = (e) => {
    setWorkplace(e.target.value);
  };

  return (
    <PopupWithForm
      title={'Редактировать профиль'}
      name={'profile'}
      isOpen={isOpen}
      onClose={onClose}
      btnText={'Сохранить'}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_name_name"
        value={name}
        onChange={onNameChange}
        name="name"
        id="name-input"
        type="text"
        minLength="2"
        maxLength="40"
        placeholder="Имя"
        required
      />
      <span className="popup__placeholder name-input-placeholder"></span>
      <input
        className="popup__input popup__input_name_job"
        value={workplace}
        onChange={onJobChange}
        name="job"
        id="job-input"
        type="text"
        minLength="2"
        maxLength="200"
        placeholder="Работа"
        required
      />
      <span className="popup__placeholder job-input-placeholder"></span>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
