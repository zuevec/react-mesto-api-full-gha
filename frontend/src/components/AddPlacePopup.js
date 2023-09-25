import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddPlace({
      name,
      link,
    });
  };

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  return (
    <PopupWithForm
      title={'Новое место'}
      name={'place'}
      isOpen={isOpen}
      onClose={onClose}
      btnText={'Сохранить'}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_name_mesto"
        value={name}
        name="place"
        onChange={handleNameChange}
        id="mesto-input"
        type="text"
        minLength="2"
        maxLength="30"
        placeholder="Название"
        required
      />
      <span className="popup__placeholder mesto-input-placeholder"></span>
      <input
        className="popup__input popup__input_name_linkImg"
        value={link}
        onChange={handleLinkChange}
        name="link"
        id="linkImg-input"
        type="url"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__placeholder linkImg-input-placeholder"></span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
