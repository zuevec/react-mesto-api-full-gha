import React, { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

const Card = ({ onCardClick, card, onCardLike, onCardDelete }) => {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;

  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `element__like ${
    isLiked ? 'element__like_active' : ''
  }`;

  return (
    <div className={`element`}>
      {isOwn && (
        <button
          type="button"
          className="element__trash"
          onClick={() => {
            onCardDelete(card);
          }}
        ></button>
      )}
      <img
        src={card.link}
        alt={card.name}
        className="element__image"
        onClick={() => onCardClick(card)}
      />

      <h2 className="element__title">{card.name}</h2>
      <div className="element__likes">
        <button
          type="button"
          className={cardLikeButtonClassName}
          onClick={() => {
            onCardLike(card);
          }}
        ></button>
        <p className="element__like-count">{card.likes.length}</p>
      </div>
    </div>
  );
};

export default Card;
