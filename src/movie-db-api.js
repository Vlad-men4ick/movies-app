export default class MovieDBapi {
  _baseApi = 'https://api.themoviedb.org';

  _token = '6eb85e2183c0bee510c54d239f547273';

  // _apiRequest = 'https://api.themoviedb.org/3/movie/550?api_key=6eb85e2183c0bee510c54d239f547273' //пример запроса
  async getResource(url) {
    const res = await fetch(`${this._baseApi}${url}`);
    if (!res.ok) {
      throw new Error('warrning');
    }
    const a = await res.json(); // await
    return a;
  }

  getMovie(id) {
    return this.getResource(`/3/movie/${id}?api_key=${this._token}`);
  }

  // getImgForMovie(id) {
  //   return this.getResource(`/3/movie/${id}/images?api_key=${this._token}`);
  // }
}
