import { apiConfig } from "./utils";

class ApiMovies {
  constructor({ headers }) {
    this._baseUrl = "https://api.nomoreparties.co/beatfilm-movies";
    this._headers = headers;
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

  getMovies() {
    return this._request(this._baseUrl, {
      headers: this._headers,
    });
  }
}

export const apiMovies = new ApiMovies(apiConfig);
