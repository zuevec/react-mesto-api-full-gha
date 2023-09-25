import React, { useContext } from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

const Main = ({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) => {
  const profileContext = useContext(CurrentUserContext);
  const { name, avatar, about } = profileContext;

  return (
    <>
      <main className="content">
        <section className="profile">
          <div className="profile__info">
            <img
              src={avatar}
              alt="Аватарка фотографа"
              className="profile__avatar"
            />
            <button
              className="profile__avatar-btn"
              onClick={onEditAvatar}
            ></button>

            <div className="profile__text">
              <h1 className="profile__name">{name ?? 'Жак Ив Кусто'} </h1>
              <button
                className="profile__edit"
                type="button"
                onClick={onEditProfile}
              />
              <p className="profile__job">{about ?? 'Frontend developer'}</p>
            </div>
          </div>
          <button
            className="profile__add-button"
            type="button"
            onClick={onAddPlace}
          />
        </section>

        <section className="elements">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </section>
      </main>
    </>
  );
};
export default Main;
