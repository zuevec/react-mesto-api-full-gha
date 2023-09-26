import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import { api } from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Route, Routes } from 'react-router-dom';
import { register, login, auth } from '../utils/register';

import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';

function App() {
  const [isInfoToolTipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isOk, setIsOk] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [error, setError] = useState('');

  const fetchCards = async () => {
    try {
      const res = await api.getCardList(localStorage.getItem('jwt'));
      setCards(res);
    } catch (e) {
      console.warn(e);
    }
  };

  const handleRegister = async (password, email) => {
    try {
      await register(password, email);
      setIsOk(true);
      setIsInfoTooltipOpen(true);
    } catch (e) {
      console.warn(e);
      setIsOk(false);
      setIsInfoTooltipOpen(true);
      setError(e);
    }
  };

  const handleLogin = async (password, email) => {
    try {
      const { token } = await login(password, email);
      setUserEmail(email);
      setIsLoggedIn(true);
      localStorage.setItem('jwt', token);
    } catch (e) {
      console.warn(e);
      setIsOk(false);
      setIsInfoTooltipOpen(true);
      setError(e);
    }
  };

  const logout = () => {
    localStorage.removeItem('jwt');
    setUserEmail('');
    setIsLoggedIn(false);
  };

  

  const checkToken = async () => {
    const token = localStorage.getItem('jwt');

    if (token) {
      try {
        const {email} = await auth(token)
        
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return null;
    });
        setUserEmail(email);
        setIsLoggedIn(true);
      } catch (e) {
        console.warn(e);
        setIsLoggedIn(false);
      }
    }
  };

  useEffect(() => {
    checkToken();
    fetchData();
    fetchCards();
}, [isLoggedIn])

  const handleCardLike = async (card) => {
    const isLiked = card.likes.some(i => i === currentUser._id);
    try {
      const resChangeLikeStatus = await api.changeLikeCardStatus(
        card._id,
        !isLiked,
        localStorage.getItem('jwt')
      );
      setCards((state) => {
        
        return state.map((c) =>
          c._id === card._id ? resChangeLikeStatus.data : c
        );
      });
    } catch (e) {
      console.warn(e);
    }
  };

  const handleDeleting = async (card) => {
    try {
      await api.removeCard(card._id, localStorage.getItem('jwt'));
      setCards((newArray) => newArray.filter((item) => card._id !== item._id));
      closeAllPopups();
    } catch (e) {
      console.warn(e);
    }
  };

  const handleUserUpdate = async (obj) => {
    try {
      const changedProfile = await api.setUserInfo(obj, localStorage.getItem('jwt'));
      setCurrentUser(changedProfile);
      closeAllPopups();
    } catch (e) {
      console.warn(e);
    }
  };

  const handleAvatarUpdate = async (obj) => {
    try {
      const avatarChanged = await api.setUserAvatar(obj, localStorage.getItem('jwt'));
      setCurrentUser(avatarChanged);
      closeAllPopups();
    } catch (e) {
      console.warn(e);
    }
  };

  const handleAddPlace = async (card) => {
    try {
      const newPlace = await api.addCard(card, localStorage.getItem('jwt'));
      setCards([newPlace, ...cards]);
      closeAllPopups();
    } catch (e) {
      console.warn(e);
    }
  };

  const fetchData = async () => {
    try {
      const profileObject = await api.getUserInfo(localStorage.getItem('jwt'));
      setCurrentUser(profileObject);
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCards();
  }, []);

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImageOpen(false);
    setIsInfoTooltipOpen(false);
  };
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    fetchData();
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (obj) => {
    setIsImageOpen(true);
    setSelectedCard(obj);
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={userEmail} logout={logout} />
        <Routes>
          <Route
            path="*"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                Component={Main}
                onAddPlace={handleAddPlaceClick}
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleDeleting}
                onCardClick={handleCardClick}
                closePopup={closeAllPopups}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register
                handleRegister={handleRegister}
                isOpen={isInfoToolTipOpen}
                isOk={isOk}
                onClose={closeAllPopups}
                error={error}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login
                handleLogin={handleLogin}
                isLoggedIn={isLoggedIn}
                isOpen={isInfoToolTipOpen}
                isOk={isOk}
                onClose={closeAllPopups}
                error={error}
              />
            }
          />
        </Routes>
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUserUpdate}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />

        <ImagePopup
          onClose={closeAllPopups}
          card={selectedCard}
          isImageOpen={isImageOpen}
        />

        <PopupWithForm
          title={'Вы уверены?'}
          name={'confirm'}
          btnText={'Да'}
        ></PopupWithForm>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleAvatarUpdate}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
