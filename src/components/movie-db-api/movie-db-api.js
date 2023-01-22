const _baseApi = 'https://api.themoviedb.org';

const _token = 'api_key=6eb85e2183c0bee510c54d239f547273';

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
