class Api {
  constructor({ address}) {
    this._address = address;
  }

  getResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getCardList(token) {
    return fetch(`${this._address}/cards`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(this.getResponse);
  }

  addCard({ name, link }, token) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this.getResponse);
  }

  removeCard(cardID, token) {
    return fetch(`${this._address}/cards/${cardID}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).then(this.getResponse);
  }

  getUserInfo(token) {
    return fetch(`${this._address}/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(this.getResponse);
  }

  setUserInfo(data, token) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this.getResponse);
  }

  setUserAvatar(data, token) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this.getResponse);
  }

    changeLikeCardStatus(cardID, like, token) {
      return fetch(`${this._address}/cards/${cardID}/likes/`, {
        method: like ? 'PUT' : 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }).then(this.getResponse);
    }
    
}

export const api = new Api({
  address: 'http://backend.zuevec.nomoredomainsrocks.ru/:3000',
});
