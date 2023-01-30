/* eslint-disable consistent-return */
const _baseURL = new URL('https://api.themoviedb.org/3/');

const _token = '6eb85e2183c0bee510c54d239f547273';

export const service_API = async (page) => {
  const service_API_URL = new URL('discover/movie', _baseURL);
  service_API_URL.searchParams.set('page', page);
  service_API_URL.searchParams.set('api_key', _token);
  const responce = await fetch(`${service_API_URL}`);
  if (!responce.ok) {
    const { status } = responce;
    throw new Error(status);
  }
  const res = await responce.json();
  return res;
};

export async function getGenres() {
  const getGenres_URL = new URL('genre/movie/list', _baseURL);
  getGenres_URL.searchParams.set('api_key', _token);
  getGenres_URL.searchParams.set('language', 'en-EN');
  const responce = await fetch(`${getGenres_URL}`);
  if (!responce.ok) {
    const { status } = responce;
    throw new Error(status);
  }
  const data = await responce.json();
  return data;
}

// возвращает ответ по значениям
export const getMovieByName = async (name, page) => {
  const getMovieByName_URL = new URL('search/movie', _baseURL);
  getMovieByName_URL.searchParams.set('page', page);
  getMovieByName_URL.searchParams.set('api_key', _token);
  getMovieByName_URL.searchParams.set('query', name);
  if (!name) return null;
  const responce = await fetch(`${getMovieByName_URL}`);
  if (!responce.ok) {
    const { status } = responce;
    throw new Error(status);
  }
  const data = await responce.json();
  return data;
};

export const newGuestSession = async () => {
  const newGuestSession_URL = new URL('authentication/guest_session/new', _baseURL);
  newGuestSession_URL.searchParams.set('api_key', _token);
  const responce = await fetch(`${newGuestSession_URL}`);
  if (!responce.ok) {
    const { status } = responce;
    throw new Error(status);
  }
  const data = await responce.json();
  return data;
};

export const rateMovie = async (id, rateValue, guestToken) => {
  const rateMovie_URL = new URL(`movie/${id}/rating`, _baseURL);
  rateMovie_URL.searchParams.set('guest_session_id', guestToken);
  rateMovie_URL.searchParams.set('api_key', _token);
  const responce = await fetch(`${rateMovie_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ value: rateValue }),
  });
  if (!responce.ok) {
    const { status } = responce;
    throw new Error(status);
  }
  const result = await responce.json();
  return result;
};

// возвращает оцененные фильмы
export const getRatedMovies = async (sessionID, page) => {
  const getRatedMovies_API = new URL(`guest_session/${sessionID}/rated/movies`, _baseURL);
  getRatedMovies_API.searchParams.set('page', page);
  getRatedMovies_API.searchParams.set('api_key', _token);
  getRatedMovies_API.searchParams.set('language', 'en-US');
  getRatedMovies_API.searchParams.set('sort_by', 'created_at.asc');
  const responce = await fetch(`${getRatedMovies_API}`);
  if (!responce.ok) {
    const { status } = responce;
    throw new Error(status);
  }
  const data = await responce.json();
  return data;
};
