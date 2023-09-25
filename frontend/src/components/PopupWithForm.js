import React from 'react';

const PopupWithForm = ({ title, name, children, isOpen, onClose, btnText, onSubmit }) => {
    

    return (
        <div className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}  id={`popup_${name}`}>
            <div className="popup__block">
                
                <button className="popup__close" id={`${name}_close`} type="button" onClick={onClose}/>
                <form className="popup__form" name={`${name}_form`} id={`${name}_form`} onSubmit={onSubmit} noValidate>
                    <h2 className="popup__title">{title}</h2>
                    {children}
                    <button className="popup__button popup__submit-button" type="submit">{btnText}
                    </button>
                </form>
            </div>
        </div>
    );
};
export default PopupWithForm;


      
