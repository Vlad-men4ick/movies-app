// export default class MovieDBapi {
const _baseApi = 'https://api.themoviedb.org';

const _token = 'api_key=6eb85e2183c0bee510c54d239f547273';

//   service_API = async (page) => {
//     const responce = await fetch(`https://api.themoviedb.org/3/discover/movie?page=${page}&${this._token}`);
//     const res = await responce.json();
//     return res;
//   };

//   getResource = async (page) => {
//     const responce = await fetch(
//       `${this._baseApi}/3/discover/movie?sort_by=popularity.desc&page=${page}&${this._token}`
//     );
//     if (!responce.ok) {
//       throw new Error('warrning');
//     }
//     const res = await res.json(); // await
//     return res;
//   };

//   getMovieByName = async (name) => {
//     if (!name) return null;
//     const responce = await fetch(`${this._baseApi}/3/search/movie?${this._token}&query=${name}`);
//     const data = await responce.json();
//     return data;
//   };

//   getGenres = async () => {
//     const responce = await fetch(`${this._baseApi}/3/genre/movie/list?${this._token}&language=en-EN`);
//     const data = await responce.json();
//     return data;
//   };

//   newGuestSession = async () => {
//     const responce = await fetch(`${this._baseApi}/3/authentication/guest_session/new?${this._token}`);
//     const data = await responce.json();
//     return data;
//   };

//   rateMovie = async (id, rateValue, guestToken) => {
//     const responce = await fetch(
//       `${this._baseApi}/3/movie/${id}/rating?guest_session_id=${guestToken}&${this._token}`,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json;charset=utf-8',
//         },
//         body: JSON.stringify({ value: rateValue }),
//       }
//     );
//     const result = await responce.json();
//     return result;
//   };

//   getRatedMovies = async (sessionID) => {
//     const responce = await fetch(
//       `${this._baseApi}/3/guest_session/${sessionID}/rated/movies?${this._token}&language=en-US&sort_by=created_at.asc`
//     );
//     const data = await responce.json();
//     return data;
//   };
// }

export const service_API = async (page) => {
  const responce = await fetch(`${_baseApi}/3/discover/movie?page=${page}&${_token}`);
  const res = await responce.json();
  return res;
};

export const getGenres = async () => {
  const responce = await fetch(`${_baseApi}/3/genre/movie/list?${_token}&language=en-EN`);
  const data = await responce.json();
  return data;
};

export const getMovieByName = async (name) => {
  if (!name) return null;
  const responce = await fetch(`${_baseApi}/3/search/movie?${_token}&query=${name}`);
  const data = await responce.json();
  return data;
};

export const newGuestSession = async () => {
  const responce = await fetch(`${_baseApi}/3/authentication/guest_session/new?${_token}`);
  const data = await responce.json();
  return data;
};

export const rateMovie = async (id, rateValue, guestToken) => {
  const responce = await fetch(`${_baseApi}/3/movie/${id}/rating?guest_session_id=${guestToken}&${_token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ value: rateValue }),
  });
  const result = await responce.json();
  return result;
};

export const getRatedMovies = async (sessionID) => {
  const responce = await fetch(
    `${_baseApi}/3/guest_session/${sessionID}/rated/movies?${_token}&language=en-US&sort_by=created_at.asc`
  );
  const data = await responce.json();
  return data;
};
