import { apiConfig } from "./utils";

class Api {
  constructor({ headers, credentials }) {
    this._baseUrl = "https://api.askario.diplom.nomoredomainsrocks.ru";
    this._headers = headers;
    this._credentials = credentials;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  register({ name, password, email }) {
    return this._request(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
  }

  login({ password, email }) {
    return this._request(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({
        email,
        password,
      }),
    });
  }

  logout() {
    return this._request(`${this._baseUrl}/signout`, {
      method: "GET",
      headers: this._headers,
      credentials: this._credentials,
    });
  }

  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
      credentials: this._credentials,
    });
  }

  setUserInfo({ name, email }) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    });
  }

  getSavedMovies() {
    return this._request(`${this._baseUrl}/movies`, {
      method: "GET",
      headers: this._headers,
      credentials: this._credentials,
    });
  }

  saveMovie({ ...data }) {
    return this._request(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({
        ...data,
      }),
    });
  }

  deleteMovie(movieId) {
    return this._request(`${this._baseUrl}/movies/${movieId}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: this._credentials,
    });
  }
}

export const api = new Api(apiConfig);
